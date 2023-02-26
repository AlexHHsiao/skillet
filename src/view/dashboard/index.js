import React from 'react';
import {Col, Row} from "antd";
import Wallet from "../components/wallet";
import Asset from "../components/asset";
import styled from "@emotion/styled";

const StyledCol = styled(Col)`
  padding: 10px;
`;

const Dashboard = () => (
    <Row>
        <StyledCol xs={24} md={8}>
            <Wallet/>
        </StyledCol>

        <StyledCol xs={24} md={16}>
            <Asset/>
        </StyledCol>
    </Row>
);

export default Dashboard;