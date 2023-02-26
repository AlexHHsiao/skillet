import React from "react";
import {Button, Col, Empty, Row, Statistic} from "antd";

const WalletContainer = ({walletConnected, connectWallet, walletBalance: {eth, weth}}) => (
    walletConnected ?
        <Row>
            <Col span={12}>
                <Statistic title="ETH" value={eth} precision={2}/>
            </Col>
            <Col span={12}>
                <Statistic title="WETH" value={weth} precision={2}/>
            </Col>
        </Row> :
        <Empty
            description={<span>Your wallet is not connected!</span>}
        >
            <Button type="primary" onClick={connectWallet}>Connect My Wallet</Button>
        </Empty>
);

export default WalletContainer;