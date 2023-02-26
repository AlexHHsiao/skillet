import React, {useState, useEffect} from 'react';
import {Layout, message} from "antd";
import Spinner from "../components/spinner";
import styled from '@emotion/styled';
import HeaderSection from "../components/header";
import {AppContext} from "../../utils/context";

const {Header, Content} = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
`;

const StyledContent = styled(Content)`
  margin-top: 64px;
  min-height: calc(100vh - 64px);
`;

const LandingPage = ({children}) => {
    const [spinnerLoading, setSpinnerLoading] = useState(false);
    const [messageData, setMessageData] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (messageData) {
            const {type, detail} = messageData;
            switch (type) {
                case "success": {
                    messageApi.success(detail, 3);
                    break;
                }
                case "error": {
                    messageApi.error(detail, 3);
                    break;
                }
                case "warning": {
                    messageApi.warning(detail, 3);
                    break;
                }
                default: {
                    messageApi.info(detail, 3);
                }
            }
        }
    }, [messageData]);

    return (
        <AppContext.Provider value={{setSpinnerLoading, setMessageData}}>
            {contextHolder}
            <Spinner load={spinnerLoading}>
                <Layout>
                    <StyledHeader>
                        <HeaderSection/>
                    </StyledHeader>
                    <StyledContent>
                        {children}
                    </StyledContent>
                </Layout>
            </Spinner>
        </AppContext.Provider>
    );
};

export default LandingPage;