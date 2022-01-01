import { Table } from 'antd';

import './pricing.scss';
import aman from '../../assets/images/icon/person.png'; // Tell webpack this JS file uses this image
// import logo from '../../assets/images/icon/logogreen.png'; // Tell webpack this JS file uses this image
import { Tabs } from 'antd';
import { SelectButton } from '../../components/actionSelect/actionSelect'
import { useNavigate } from "react-router-dom";
 
const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}
const Pricing = () => {
    const navigate = useNavigate();

    // const dataSourceBasic = [
    //     {
    //         key: '1',
    //         price: 'Coverage limit of upto N240,000',
    //     },
    //     {
    //         key: '2',
    //         price: 'Telemedicine',

    //     },
    //     {
    //         key: '3',
    //         price: 'Up to two specialist consultations per year',
    //     },
    //     {
    //         key: '4',
    //         price: 'Basic lab and routine radiological investigations',
    //     },
    // ];

    const dataSourceBronze = [
        {
            key: '1',
            price: 'Coverage limit of upto N700,000',

        },
        {
            key: '2',
            price: 'Telemedicine',

        },
        {
            key: '3',
            price: 'Covers specialist consultation',
        },
        {
            key: '4',
            price: 'Antenatal and Postnatal Care',
        },
    ];
    const dataSourceSilver = [
        {
            key: '1',
            price: 'Coverage limit of upto N1,400,000',

        },
        {
            key: '2',
            price: 'Telemedicine',

        },
        {
            key: '3',
            price: 'Covers specialist consultation',
        },
        {
            key: '4',
            price: 'Antenatal and Postnatal Care',
        },
        {
            key: '5',
            price: 'Surgery limit of upto N150,000',
        },
        {
            key: '6',
            price: 'Covers immunizations',
        }
    ];
    const dataSourceGold = [
        {
            key: '1',
            price: 'Coverage limit of upto N3,600,000',

        },
        {
            key: '2',
            price: 'Telemedicine',

        },
        {
            key: '3',
            price: 'Covers specialist consultation',
        },
        {
            key: '4',
            price: 'Antenatal and Postnatal Care',
        },
        {
            key: '5',
            price: 'Surgery limit of upto N500,000',
        },
        {
            key: '6',
            price: 'Covers immunizations',
        },
        {
            key: '7',
            price: 'Private Wards (upto 20 days per annum)',
        },
    ];

    const dataSourcePlatinium = [
        {
            key: '1',
            price: 'Coverage limit of upto N5,000,000',

        },
        {
            key: '2',
            price: 'Telemedicine',

        },
        {
            key: '3',
            price: 'Covers specialist consultation',
        },
        {
            key: '4',
            price: 'Antenatal and Postnatal Care',
        },
        {
            key: '5',
            price: 'Surgery limit of upto N1,000,000',
        },
        {
            key: '6',
            price: 'Covers immunizations',
        },
        {
            key: '7',
            price: 'Private Wards (upto 30 days per annum)',
        },
        {
            key: '8',
            price: 'Doctor home visits',
        },
        {
            key: '9',
            price: 'Cancer care (upto N500,000)',
        },
    ];
    // const columnBasic = [
    //     {
    //         title: 'Starting at N1500 per individual per month',
    //         dataIndex: 'price',
    //         key: 'price',
    //     },
    // ];
    const columnBronze = [
        {
            title: 'Starting at N35,784 for individuals and N136,122 for a family of six',
            dataIndex: 'price',
            key: 'price',
        },
    ];
    const columnSilver = [
        {
            title: 'Starting at N55,394 for individuals and N203,406 for a family of six',
            dataIndex: 'price',
            key: 'price',
        },
    ];
    const columnGold = [
        {
            title: 'Starting at N96,066 for individuals and N356,365 for a family of six',
            dataIndex: 'price',
            key: 'price',
        },
    ];
    const columnPlatinium = [
        {
            title: 'Starting at N145,836 for individuals and N534,930 for a family of six',
            dataIndex: 'price',
            key: 'price',
        },
    ];

    return (
        <div className='pricing' style={{
            // backgroundImage:`url(${logo})`,
            // backgroundRepeat: 'repeat',
            // backgroundPosition: 'right',
            // backgroundSize: 'contain',
            // backgroundAttachment: "fixed" 
            }}>
            <div className='pricing-container'>
                <div className='pricing-image'>
                    <img src={aman} alt="img" />
                </div>

                <div className='pricing-table'>
                    <Tabs centered defaultActiveKey="1" onChange={callback}>
                        {/* <TabPane tab="BASIC" key="1" style={{ textAlign: "center" }}>
                            <Table style={{ margin: "auto", textAlign: "center" }} dataSource={dataSourceBasic} columns={columnBasic} pagination={{ position: ['none', 'none'] }} />
                            <SelectButton text="Select This Plan" onClick={() => navigate('/register', {state: { option: "BASIC", price: 1500, sixPrice: 9000  }})} />
                        </TabPane> */}
                        <TabPane tab="BRONZE" key="2">
                            <Table dataSource={dataSourceBronze} columns={columnBronze} pagination={{ position: ['none', 'none'] }} />
                            <SelectButton text="Select This Plan" onClick={() =>navigate('/register', {state: { option: "BRONZE", price: 35784, sixPrice: 136122 }})} />
                        </TabPane>
                        <TabPane tab="SILVER" key="3">
                            <Table dataSource={dataSourceSilver} columns={columnSilver} pagination={{ position: ['none', 'none'] }} />
                            <SelectButton text="Select This Plan" onClick={() => navigate('/register', {state: { option: "SILVER", price: 55394, sixPrice: 203406 }})} />
                        </TabPane>
                        <TabPane tab="GOLD" key="4">
                            <Table dataSource={dataSourceGold} columns={columnGold} pagination={{ position: ['none', 'none'] }} />
                            <SelectButton text="Select This Plan" onClick={() => navigate('/register', {state: { option: "GOLD", price: 96066, sixPrice: 356365  }})} />
                        </TabPane>
                        <TabPane tab="PLATINIUM" key="5">
                            <Table dataSource={dataSourcePlatinium} columns={columnPlatinium} pagination={{ position: ['none', 'none'] }} />
                            <SelectButton text="Select This Plan" onClick={() => navigate('/register', {state: { option: "PLATINIUM", price: 145836, sixPrice: 534930 }})} />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Pricing;