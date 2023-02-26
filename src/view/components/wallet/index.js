import React, {useState, useEffect, useContext} from 'react';
import {Card, Alert} from 'antd';
import Web3 from "web3";
import ABI from '../../../utils/json/ABI.json';
import {METAMASK_URL, WETH_CONTRACT} from "../../../utils/constants";
import {AppContext} from "../../../utils/context";
import WalletContainer from "./wallet-container";

const Wallet = () => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const {ethereum} = window;
    const [walletAddress, setWalletAddress] = useState(null);
    const [walletBalance, setWalletBalance] = useState({});

    const checkConnection = async () => {
        try {
            const [account] = await ethereum.request({method: 'eth_accounts'});
            if (account) {
                setWalletAddress(account);
            }
        } catch (e) {
        }
    };

    const getWalletBalance = async () => {
        try {
            const web3 = new Web3(ethereum);
            const ETH = await web3.eth.getBalance(walletAddress);
            const wethContract = new web3.eth.Contract(ABI, WETH_CONTRACT);
            const WETH = await wethContract.methods.balanceOf(walletAddress).call();

            setWalletBalance({
                eth: web3.utils.fromWei(ETH, 'ether'),
                weth: web3.utils.fromWei(WETH, 'ether'),
            });
            setMessageData({type: 'success', detail: 'Wallet has connected'});
        } catch ({message = 'something went wrong'}) {
            setMessageData({type: 'error', detail: message});
        }
    };

    const connectWallet = async () => {
        try {
            setSpinnerLoading(true);
            const [account] = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            setSpinnerLoading(false);
            setWalletAddress(account);
        } catch ({message = 'something went wrong'}) {
            setSpinnerLoading(false);
            setMessageData({type: 'error', detail: message});
        }
    };

    useEffect(() => {
        checkConnection();
    }, []);

    useEffect(() => {
        if (walletAddress) {
            getWalletBalance();
        }
    }, [walletAddress]);

    return (
        <Card title="My Wallet" bordered={false}>
            {
                ethereum ?
                    <WalletContainer walletConnected={walletAddress} connectWallet={connectWallet}
                                     walletBalance={walletBalance}/> :
                    <Alert
                        message={<span>MetaMask is not installed in your browser. Check <a href={METAMASK_URL}
                                                                                           target='_blank'>here</a> for more information.</span>}
                        type="warning"
                        showIcon
                    />
            }
        </Card>
    );
};

export default Wallet;