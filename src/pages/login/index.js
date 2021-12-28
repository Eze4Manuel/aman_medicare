import Structure from "../../components/layout/index";
import React, { useState } from 'react';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { useNavigate } from "react-router-dom"
import { useNotifications } from '@mantine/notifications';
import { useAuth } from '../../core/hooks/useAuth';
import { Form, Input } from 'antd';
import Loader from "react-loader-spinner";
import lib from '../lib';
import helpers from '../../core/Helpers';
import './login.scss';

const Login = () => {
    const [form] = Form.useForm();
    const [formLayout,] = useState('vertical');
    const navigate = useNavigate();
    const [values, setValues] = React.useState({});
    const [loading, setLoading] = useState(false);
    const { set, } = useAuth();
    const notify = useNotifications();

    const handleLogin = async () => {
        setLoading(true);
        let reqData = await lib.login(values)
        setLoading(false);

        if (reqData?.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData?.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
            helpers.loadUserInStore(reqData?.data)
            set(reqData?.data)
            setTimeout(() => {
                navigate('/predashboard');
            }, 2000
            )
        }
    }; 

    return (
        <Structure className="login">
            <div className="login-center">
                <div className="app-login">
                    <div className="app-login__container">
                        <div className="app-login__content">
                            <PageHeaderComp title="Login To Your Account" />
                            <div className="app-login__error">
                            </div>
                            <div className="p-fluid p-formgrid p-grid p-mx-5">
                                <div style={{ width: '100%', marginTop: "35px" }} className="container">
                                    <div className="row">
                                        <Form
                                            layout={"vertical"}
                                            form={form}
                                            initialValues={{
                                                layout: formLayout,
                                            }}
                                        >
                                            <Form.Item label="Email or Policy or Phone number" required tooltip="This is a required field" >
                                                <Input onChange={e => setValues(d => ({ ...d, policy_no: e.target.value }))} autoFocus value={values?.fullName} placeholder="example@email.com" style={{ padding: "10px", borderRadius: "6px" }} />
                                            </Form.Item>
                                            <Form.Item label="Password" required tooltip="This is a required field">
                                                <Input type="password" placeholder="password" onChange={e => setValues(d => ({ ...d, password: e.target.value }))} value={values?.password} style={{ padding: "10px", borderRadius: "6px" }} />
                                            </Form.Item>
                                            <Form.Item>
                                                
                                                <ButtonComponent text="LOGIN" onClick={handleLogin} />
                                                
                                                <div className="" style={{ marginTop: "30px" }}>
                                                    <PageHeaderComp title="Create Account" style={{ fontSize: "16px", color: "#276AFF", cursor: "pointer" }} onClick={() => navigate('/register', { replace: true })} />
                                                </div>
                                                <Loader
                                                    type="Oval"
                                                    color="#00BFFF"
                                                    height={30}
                                                    visible={loading}
                                                    width={30}
                                                />
                                                
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Structure>
    )
}
export default Login;