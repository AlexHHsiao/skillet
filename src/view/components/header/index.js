import React from 'react';
import {Col, Row} from "antd";
import logo from '../../../utils/images/logo.png';
import styled from '@emotion/styled';
import {SKILLET_URL} from "../../../utils/constants";

const StyledRow = styled(Row)`
  height: 100%;
`;

const StyledCol = styled(Col)`
  height: 100%;
  padding: 10px 0;
`;

const StyledImg = styled.img`
  height: 100%;
  cursor: pointer;
`;

const HeaderSection = () => {

    const logoClickHandler = () => {
        window.open(SKILLET_URL);
    };

    return (
        <StyledRow>
            <Col xs={2} md={4}></Col>
            <StyledCol xs={20} md={16} align="middle">
                <StyledImg src={logo} onClick={logoClickHandler}/>
            </StyledCol>
            <Col xs={2} md={4}></Col>
        </StyledRow>
    );
};

export default HeaderSection;