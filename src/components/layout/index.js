import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';
import {Link} from 'react-router-dom';
import './layout.scss';
const { Content } = Layout;



const Structure = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <Layout className="layout">
            
            <Content>
                {props.children}
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
    )
}
export default Structure;

