import React, {useState, useEffect, useContext} from 'react';
import {Card, Select, Empty} from 'antd';
import {AppContext} from "../../../utils/context";
import {getCollections} from "../../../utils/api";
import AssetContainer from "./asset-container";

const Asset = () => {
    const {setSpinnerLoading, setMessageData} = useContext(AppContext);
    const [collections, setCollections] = useState(null);
    const [dropdownOptions, setDropdownOptions] = useState([]);
    const [dropdownSelection, setDropdownSelection] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                setSpinnerLoading(true);
                const response = await getCollections();
                const collections = await response.json();
                const newDropdown = collections.map(({name}, index) => ({
                    label: name,
                    value: index,
                }));

                setSpinnerLoading(false);
                setCollections(collections);
                setDropdownOptions(newDropdown);
            } catch ({message = 'something went wrong'}) {
                setSpinnerLoading(false);
                setMessageData({type: 'error', detail: message});
            }
        };

        fetchCollections();
    }, []);

    const dropdownChangeHandler = (value) => {
        setDropdownSelection(value);
    };

    return (
        <Card
            title="Asset Collections"
            bordered={false}
            extra={
                <Select
                    style={{
                        width: 220,
                    }}
                    onChange={dropdownChangeHandler}
                    placeholder="Select Collection"
                    options={dropdownOptions}
                />
            }
        >
            {
                dropdownSelection !== null ?
                    <AssetContainer collection={collections[dropdownSelection]}/>
                    : <Empty/>
            }
        </Card>
    );
};

export default Asset;