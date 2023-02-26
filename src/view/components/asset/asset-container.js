import React, {useContext, useEffect, useState} from 'react';
import {getAssets} from "../../../utils/api";
import {Card, Row, Col, Descriptions, Avatar, Button, Popover} from 'antd';
import {AppContext} from "../../../utils/context";
import styled from "@emotion/styled";
import {ipfsHelper, twitterHelper} from "../../../utils/helper";

const {Meta} = Card;

const StyledCol = styled(Col)`
  padding: 5px;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const popoverContent = (discord, twitter, site) => (
    <Row>
        <Col span={24}><a href={discord} target='_blank'>Discord</a></Col>
        <Col span={24}><a href={twitter} target='_blank'>Twitter</a></Col>
        <Col span={24}><a href={site} target='_blank'>Official Site</a></Col>
    </Row>
);

const AssetContainer = ({collection}) => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const {
        address,
        banner_image_url,
        description,
        discord_url,
        external_url,
        image_url,
        twitter_username,
        name
    } = collection;
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        // fetch assets data everytime collection is selected in case server is making any change
        const fetchAssets = async () => {
            try {
                setSpinnerLoading(true);
                const response = await getAssets(address);
                const collectionAssets = await response.json();
                setSpinnerLoading(false);
                setAssets(collectionAssets);
            } catch ({message = 'something went wrong'}) {
                setSpinnerLoading(false);
                setMessageData({type: 'error', detail: message});
            }
        };

        fetchAssets();
    }, [collection]);

    return (
        <>
            {banner_image_url && <StyledImage src={banner_image_url}/>}
            <Descriptions title={name}>
                <Descriptions.Item label="Description">
                    {description}
                </Descriptions.Item>
            </Descriptions>
            <StyledAvatar size="large" src={image_url}/>
            <Popover content={() => popoverContent(discord_url, twitterHelper(twitter_username), external_url)}
                     title="Links">
                <Button type="primary">Contact Me</Button>
            </Popover>
            <Row>
                {assets.map(({token_id, image_url}) => (
                    <StyledCol xs={12} md={8} lg={6} key={token_id}>
                        <Card
                            hoverable
                            cover={<img alt="nft" src={ipfsHelper(image_url)}/>}
                        >
                            <Meta title={`Token ID: ${token_id}`}/>
                        </Card>
                    </StyledCol>
                ))}
            </Row>
        </>
    );
};

export default AssetContainer;