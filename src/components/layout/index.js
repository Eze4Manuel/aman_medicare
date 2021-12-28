import React from 'react';
import { Layout } from 'antd';
import './layout.scss';
const { Content } = Layout;



const Structure = (props) => {
 
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

