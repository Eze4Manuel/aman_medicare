import React, { useEffect, useState } from 'react';
import { uri2 } from '../../assets/utils/http-request';

import { Modal } from 'antd';
import { useNavigate } from "react-router-dom"
import logogreen from '../../assets/images/icon/logogreen.png'; // Tell webpack this JS file uses this image
// import account from '../../assets/images/account.png'; // Tell webpack this JS file uses this image
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import './preDashboard.scss';
import { Layout, Menu } from 'antd';
import logom from '../../assets/images/icon/logom.png'; // Tell webpack this JS file uses this image
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/Helpers';
import lib from '../lib';
import Loader from "react-loader-spinner";
import ErrorMessage from '../../components/error/ErrorMessage';
import formValidator from '../formvalidation';
import { List, Avatar } from 'antd';
import { Select } from 'antd';

import {
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';

import { Form, Input, Row, Col, DatePicker, Radio } from 'antd';
import UploadImage from './uploadImage';
import SuggestFaculty from './suggestFaculty';
import EditBio from './editBio';

const { Content, Sider } = Layout;

const { Header } = Layout;

const { TextArea } = Input;



const PreDashboard = () => {
    const [,] = useState('vertical');
    const navigate = useNavigate();
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [isPrincipalModalVisible, setIsPrincipalModalVisible] = useState(false);
    const [isDependentModalVisible, setIsDependentModalVisible] = useState(false);
    const [, setIsModalVisible] = useState(false);
    const [data, setData] = useState(null);
    const [dependentList, setDependentList] = useState([]);



    // Getting principal
    useEffect(() => {
        if (!user) navigate('/login');

        (async () => {
            let payload = {
                policy_no: user?.policy_no
            }
            let reqData = await lib.getPrincipal(payload);
            if (reqData.data?.error === 1) {
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
            }
            if (reqData?.error === 0) {
                let principal = reqData.data;
                principal.status = 'principal'
                setData(principal);
            }
        })()
    }, [navigate, notify, user])


    // Getting dependent
    useEffect(() => {
        (async () => {
            let payload = {
                policy_no: user?.policy_no
            }
            let reqData = await lib.getDependent(payload);
            if (reqData?.error === 1) {
                helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.message })
            }
            if (reqData?.error === 0) {
                let dependent = reqData.data.map(elem => (
                    { ...elem, status: 'dependents' }
                ))
                setDependentList(dependent)
            }
            console.log(reqData);

        })()
    }, [notify, user?.policy_no])


    const showDependentModal = () => {
        setIsDependentModalVisible(true);
    };
    const showPrincipalModal = () => {
        setIsPrincipalModalVisible(true);
    };
    const handleDependentOk = () => {
        setIsDependentModalVisible(false);
    };
    const handleDependentCancel = () => {
        setIsDependentModalVisible(false);
    };
    const handlePrincipalOk = () => {
        setIsPrincipalModalVisible(false);
    };
    const handlePrincipalCancel = () => {
        setIsPrincipalModalVisible(false);
    };
    const onRowSelected = (record) => {
        setIsModalVisible(true);
    }

    const logUserOut = () => {
        helpers.logout(set);
        navigate('/login')
    };

    console.log();
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {

                    }}
                    onCollapse={(collapsed, type) => {

                    }} style={{ height: "revert", width: "250px", minWidth: "250px", color: "#fff" }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img alt="img" style={{ width: "120px", textAlign: "center", margin: "auto" }} src={logogreen} />
                        </div>
                        <p style={{ marginBottom: "50px", textAlign: "center" }} >AMAN MEDICARE</p>
                        {!data ? <Menu.Item key="1" onClick={showPrincipalModal} icon={<PieChartOutlined />}>
                            Create My Bio
                        </Menu.Item> : null}
                        {((parseInt(user.enrolee_size) - 1) >= dependentList.length) ?
                            <Menu.Item onClick={showDependentModal} key="2" icon={<UserOutlined />}>
                                Add Dependents
                            </Menu.Item>
                            : null}

                        <Menu.Item onClick={logUserOut} key="3" icon={<LogoutOutlined />}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{}}>
                    <Header style={{ backgroundColor: "transparent" }}>
                        <h2 style={{ fontSize: "30", fontWeight: "bold", color: "#4aba70" }}>Aman Medicare</h2>
                    </Header>
                    <Content>
                        <div className="user-details">
                            <div className="user-details-block">
                                <p>
                                    <span style={{ marginRight: "10px" }}><b>Name: </b></span>
                                    <span>{user?.fullName}</span>
                                </p>
                                <p>
                                    <span style={{ marginRight: "10px" }}><b>Email: </b></span>
                                    <span>{user?.email}</span>
                                </p>
                                <p>
                                    <span style={{ marginRight: "10px" }}><b>Policy Number: </b></span>
                                    <span>{user?.policy_no}</span>
                                </p>
                                <p>
                                    <span style={{ marginRight: "10px" }}><b>Insurance Package: </b></span>
                                    <span>{user?.insurance_package}</span>
                                </p>
                                <p>
                                    <span style={{ marginRight: "10px" }}><b>Enrolle Size: </b></span>
                                    <span>{user?.enrolee_size}</span>
                                </p>
                            </div>
                            <ListOfDependent onSelected={onRowSelected} data={data} dependentList={dependentList} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
            <PricipalEdit style={{ top: 20 }} isModalVisible={isPrincipalModalVisible} handleOk={handlePrincipalOk} handleCancel={handlePrincipalCancel} />
            <DependantEdit style={{ top: 20 }} isModalVisible={isDependentModalVisible} handleOk={handleDependentOk} handleCancel={handleDependentCancel} />
        </>
    )
}
export default PreDashboard;


const DependantEdit = (props) => {
    const [form] = Form.useForm();
    const [,] = useState('hidden');
    const [values, setValues] = useState({});
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const notify = useNotifications();
    const { user } = useAuth();
    const [stateHealthCare, setStateHealtCare] = useState([]);

    const { Option } = Select;

    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];
    const optionsMarital = [
        { label: 'Spouse', value: 'spouse' },
        { label: 'Child', value: 'child' },
    ];

    const states = [
        { label: 'Abia', value: 'abia' },
        { label: 'Adamawa', value: 'adamawa' },
        { label: 'Akwa Ibom', value: 'akwa ibom' },
        { label: 'Anambra', value: 'anambra' },
        { label: 'Bauchi', value: 'bauchi' },
        { label: 'Bayelsa', value: 'bayelsa' },
        { label: 'Benue', value: 'benue' },
        { label: 'Borno', value: 'borno' },
        { label: 'Cross River', value: 'cross river' },
        { label: 'Delta', value: 'delta' },
        { label: 'Ebonyi', value: 'ebonyi' },
        { label: 'Edo', value: 'edo' },
        { label: 'Ekiti', value: 'ekiti' },
        { label: 'Enugu', value: 'enugu' },
        { label: 'FCT', value: 'fct' },
        { label: 'Gombe', value: 'gombe' },
        { label: 'Imo', value: 'imo' },
        { label: 'Jigawa', value: 'jigawa' },
        { label: 'Kaduna', value: 'kaduna' },
        { label: 'Kano', value: 'kano' },
        { label: 'Katsina', value: 'kastina' },
        { label: 'Kebbi', value: 'kebbi' },
        { label: 'Kogi', value: 'kogi' },
        { label: 'Kwara', value: 'kwara' },
        { label: 'Lagos', value: 'lagos' },
        { label: 'Nasarawa', value: 'nasarawa' },
        { label: 'Niger', value: 'niger' },
        { label: 'Ogun', value: 'ogun' },
        { label: 'Ondo', value: 'ondo' },
        { label: 'Osun', value: 'osun' },
        { label: 'Oyo', value: 'oyo' },
        { label: 'Plateau', value: 'plateau' },
        { label: 'Rivers', value: 'rivers' },
        { label: 'Sokoto', value: 'sokot' },
        { label: 'Yobe', value: 'yobe' },
        { label: 'Zamfara', value: 'zamfara' }
    ];

    const selectDate = (date, dateString) => {
        setValues(d => ({ ...d, birth_day: dateString }))
    }

    const fetchProviders = async (e) => {
        let obj = {
            state: e,
            plan_type: user?.insurance_package
        }
        let reqData = await lib.getProviders(obj);

        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData?.error === 0) {
            setStateHealtCare(reqData.data)
        }
        setLoading(false);
    }

    const handleDependentSubmit = async () => {

        let builder = formValidator.validateDependent(values, {}, setError)
        if (!builder) {
            return
        }
        setLoading(true);
        builder.policy_no = user.policy_no

        let reqData = await lib.saveDependent(builder);
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
            props.handleCancel();
            setTimeout(()=> window.location.reload(), 1500)
        }
        setLoading(false);
    }

    return (
        <>
            <Modal width={1200} visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel} footer={null}>
                <div style={{ width: "90%", margin: "auto" }}>
                    <PageHeaderComp title="Dependent's Bio Data" />
                    <div className="profile-top" >
                        <Row>
                            <Col>
                                <div className='profile-form'>
                                    <Form
                                        form={form}
                                        layout="vertical"
                                    >
                                        <div className="">
                                            <div className='form-group'>
                                                <Form.Item label="First Name" required tooltip="Enter your name">
                                                    <Input onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} value={values?.first_name} placeholder="John" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>

                                                <Form.Item label="Middle Name" tooltip={{ title: 'Enter your email address', icon: <InfoCircleOutlined /> }}>
                                                    <Input onChange={e => setValues(d => ({ ...d, middle_name: e.target.value }))} value={values?.middle_name} placeholder="Doe" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Surname"
                                                    tooltip={{ title: 'Enter your surname', icon: <InfoCircleOutlined /> }}>
                                                    <Input onChange={e => setValues(d => ({ ...d, surname: e.target.value }))} value={values?.surname} placeholder="Clark" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="Email" required tooltip="Enter Dependent Email">
                                                    <Input onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values?.email} placeholder="example@gmail.com" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item label="Phone number" tooltip={{ title: 'Enter phone number', icon: <InfoCircleOutlined /> }} >
                                                    <Input onChange={e => setValues(d => ({ ...d, phone: e.target.value }))} value={values?.phone} placeholder="09000000000" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="State of Residence" required tooltip={{ title: 'Enter your state', icon: <InfoCircleOutlined /> }}>
                                                    <Select defaultValue={"Select state"} style={{ width: "250px", marginRight: "10px" }} onChange={e => { setValues(d => ({ ...d, state: e })); fetchProviders(e); }} value={values?.state}>
                                                        {states?.map(item => (
                                                            <>
                                                                <Option value={item.value}>{item.label}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="LGA" required tooltip="Enter your local govenrment">
                                                    <Input onChange={e => setValues(d => ({ ...d, lga: e.target.value }))} value={values?.lga} placeholder="3" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Date of Birth" required tooltip="Date of Birth">
                                                    <DatePicker style={{ width: '200px' }} onChange={selectDate} />
                                                </Form.Item>

                                                <Form.Item label="Gender" required tooltip="Gender">
                                                    <Radio.Group style={{ marginLeft: '20px' }} options={options} onChange={e => setValues(d => ({ ...d, gender: e.target.value }))} value={values?.gender} />
                                                </Form.Item>
                                                <Form.Item label="Relationship" required tooltip="Relationship">
                                                    <Radio.Group style={{ marginLeft: '20px' }} options={optionsMarital} onChange={e => setValues(d => ({ ...d, relationship: e.target.value }))} value={values?.relationship} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Religion" required tooltip="Enter your religion">
                                                    <Select defaultValue={values?.religion} style={{ width: 250, marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, religion: e }))} placeholder="select religion" >
                                                        <Option value="christianity">Christianity</Option>
                                                        <Option value="catholic">Catholic</Option>
                                                        <Option value="islam">Islam</Option>
                                                        <Option value="others">Others</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item label="Job title" required tooltip="Enter Occupation">
                                                    <Input onChange={e => setValues(d => ({ ...d, job_title: e.target.value }))} value={values?.job_title} placeholder="Engineer" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="Primary Health Care Facility" tooltip="Enter health care facility">
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, primary_health_facility: e }))} value={values?.primary_health_facility}>
                                                        {stateHealthCare?.map(item => (
                                                            <>
                                                                <Option value={item.name}>{item.name}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Secondary Health Care Facility" tooltip={{ title: 'Enter health care facility', icon: <InfoCircleOutlined /> }} >
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, secondary_health_facility: e }))} value={values?.secondary_health_facility}>

                                                        {stateHealthCare?.map(item => (
                                                            <>
                                                                <Option value={item.name}>{item.name}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="" required tooltip="Enter your Medical Condition" style={{ marginRight: "20px" }} >
                                                    <SuggestFaculty />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="Contact Address" required tooltip="Enter your Medical Condition" style={{ marginRight: "20px" }} >
                                                    <TextArea onChange={e => setValues(d => ({ ...d, contact_address: e.target.value }))} value={values?.contact_address} showCount maxLength={250} style={{ height: 60, width: 250 }} />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="profile-password">
                                            <h3>Medical Condition</h3>
                                            <div className='form-group'>
                                                <Form.Item label="Existing Medical Condition" required tooltip="Enter your Medical Condition" style={{ marginRight: "20px" }} >
                                                    <TextArea onChange={e => setValues(d => ({ ...d, existing_medical_condition: e.target.value }))} value={values?.existing_medical_condition} showCount maxLength={250} style={{ height: 120, width: 250 }} />
                                                </Form.Item>
                                                <Form.Item label="Previous Medical Condition" required tooltip="Enter your Medical Condition">
                                                    <TextArea onChange={e => setValues(d => ({ ...d, previous_medical_condition: e.target.value }))} value={values?.previous_medical_condition} showCount maxLength={250} style={{ height: 120, width: 250 }} />
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="profile-button" >
                                            <Form.Item>
                                                <div style={{ display: "flex" }}>
                                                <span style={{marginRight: "10px"}}><ButtonComponent text="Submit" onClick={handleDependentSubmit} /></span>
                                                <span style={{marginRight: "10px"}}><ButtonComponent text="Cancel" onClick={props.handleCancel} /></span>
                                                </div>
                                                
                                                <Loader type="Oval" color="#00BFFF" height={30} visible={loading} width={30} style={{ margin: "10px" }} />
                                                {error ? <ErrorMessage message={error} /> : null}
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        </>
    )
}

const PricipalEdit = (props) => {
    const [form] = Form.useForm();
    const [values, setValues] = React.useState({});
    const { user } = useAuth();
    const notify = useNotifications();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = useState(false);

    const [stateHealthCare, setStateHealtCare] = useState([]);

    const { Option } = Select;

    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const states = [
        { label: 'Abia', value: 'abia' },
        { label: 'Adamawa', value: 'adamawa' },
        { label: 'Akwa Ibom', value: 'akwa ibom' },
        { label: 'Anambra', value: 'anambra' },
        { label: 'Bauchi', value: 'bauchi' },
        { label: 'Bayelsa', value: 'bayelsa' },
        { label: 'Benue', value: 'benue' },
        { label: 'Borno', value: 'borno' },
        { label: 'Cross River', value: 'cross river' },
        { label: 'Delta', value: 'delta' },
        { label: 'Ebonyi', value: 'ebonyi' },
        { label: 'Edo', value: 'edo' },
        { label: 'Ekiti', value: 'ekiti' },
        { label: 'Enugu', value: 'enugu' },
        { label: 'FCT', value: 'fct' },
        { label: 'Gombe', value: 'gombe' },
        { label: 'Imo', value: 'imo' },
        { label: 'Jigawa', value: 'jigawa' },
        { label: 'Kaduna', value: 'kaduna' },
        { label: 'Kano', value: 'kano' },
        { label: 'Katsina', value: 'kastina' },
        { label: 'Kebbi', value: 'kebbi' },
        { label: 'Kogi', value: 'kogi' },
        { label: 'Kwara', value: 'kwara' },
        { label: 'Lagos', value: 'lagos' },
        { label: 'Nasarawa', value: 'nasarawa' },
        { label: 'Niger', value: 'niger' },
        { label: 'Ogun', value: 'ogun' },
        { label: 'Ondo', value: 'ondo' },
        { label: 'Osun', value: 'osun' },
        { label: 'Oyo', value: 'oyo' },
        { label: 'Plateau', value: 'plateau' },
        { label: 'Rivers', value: 'rivers' },
        { label: 'Sokoto', value: 'sokot' },
        { label: 'Yobe', value: 'yobe' },
        { label: 'Zamfara', value: 'zamfara' }
    ];


    const optionsMarital = [
        { label: 'Single', value: 'single' },
        { label: 'Married', value: 'married' },
    ];

    const handlePrincipalSubmit = async () => {
        let builder = formValidator.validatePrincipal(values, {}, setError)
        if (!builder) {
            return
        }
        setLoading(true);

        builder.insurance_package = user.insurance_package
        builder.policy_no = user.policy_no

        let reqData = await lib.saveNewProfile(builder);
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
            props.handleCancel();
            window.location.reload();
        }

        setLoading(false);

    }

    const selectDate = (date, dateString) => {
        setValues(d => ({ ...d, date_of_birth: dateString }))
    }



    const fetchProviders = async (e) => {
        let obj = {
            state: e,
            plan_type: user?.insurance_package
        }
        let reqData = await lib.getProviders(obj);

        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData?.error === 0) {
            setStateHealtCare(reqData.data)
        }
        setLoading(false);
    }


    return (
        <>
            <Modal width={1200} visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel} footer={null}>
                <div style={{ width: "90%", margin: "auto" }}>
                    <PageHeaderComp title="Principal's Bio Data" />
                    <div className="profile-top" >
                        <Row>
                            <Col>
                                <div className='profile-form'>
                                    <Form
                                        form={form}
                                        layout="vertical"
                                    >
                                        <div className="">
                                            <div className='form-group'>
                                                <Form.Item label="Insurance package" tooltip={{ title: 'Insurance package', icon: <InfoCircleOutlined /> }} >
                                                    <Input disabled value={user?.insurance_package} placeholder="Basic, Bronze, Silver ..." style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="First Name" required tooltip="Enter your name">
                                                    <Input onChange={e => setValues(d => ({ ...d, first_name: e.target.value }))} value={values?.first_name} placeholder="John" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item label="Middle Name" tooltip={{ title: 'Enter your email address', icon: <InfoCircleOutlined /> }}>
                                                    <Input placeholder="Doe" onChange={e => setValues(d => ({ ...d, middle_name: e.target.value }))} value={values?.middle_name} style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item label="Surname" tooltip={{ title: 'Enter your surname', icon: <InfoCircleOutlined /> }}>
                                                    <Input onChange={e => setValues(d => ({ ...d, surname: e.target.value }))} value={values?.surname} placeholder="Clark" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="State of Residence" required tooltip={{ title: 'Enter your state', icon: <InfoCircleOutlined /> }}>
                                                    <Select defaultValue={"Select state"} style={{ width: "250px", marginRight: "10px" }} onChange={e => { setValues(d => ({ ...d, state: e })); fetchProviders(e); }} value={values?.state}>
                                                        {states?.map(item => (
                                                            <>
                                                                <Option value={item.value}>{item.label}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item label="LGA" required tooltip="Enter your local govenrment">
                                                    <Input onChange={e => setValues(d => ({ ...d, lga: e.target.value }))} value={values?.lga} placeholder="Ogidilu" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Date of Birth" required tooltip="Date of Birth">
                                                    <DatePicker style={{ width: '200px' }} onChange={selectDate} />
                                                </Form.Item>

                                                <Form.Item label="Gender" required tooltip="Gender">
                                                    <Radio.Group style={{ marginLeft: '20px' }} options={options} onChange={e => setValues(d => ({ ...d, gender: e.target.value }))} value={values?.gender} />
                                                </Form.Item>

                                                <Form.Item label="Marital Status" required tooltip="Gender">
                                                    <Radio.Group style={{ marginLeft: '20px' }} options={optionsMarital} onChange={e => setValues(d => ({ ...d, marital_status: e.target.value }))} value={values?.marital_status} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Religion" required tooltip="Enter your religion">
                                                    <Select defaultValue={values?.religion} style={{ width: 250, marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, religion: e }))} placeholder="select religion" >
                                                        <Option value="christianity">Christianity</Option>
                                                        <Option value="catholic">Catholic</Option>
                                                        <Option value="islam">Islam</Option>
                                                        <Option value="others">Others</Option>
                                                    </Select>
                                                </Form.Item>

                                                <Form.Item label="Job title" required tooltip="Enter Occupation">
                                                    <Input placeholder="Engineer" onChange={e => setValues(d => ({ ...d, job_title: e.target.value }))} value={values?.job_title} style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Primary Health Care Facility" tooltip="Enter health care facility">
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, primary_health_facility: e }))} value={values?.primary_health_facility}>
                                                        {stateHealthCare?.map(item => (
                                                            <>
                                                                <Option value={item.name}>{item.name}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Secondary Health Care Facility" tooltip={{ title: 'Enter health care facility', icon: <InfoCircleOutlined /> }} >
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, secondary_health_facility: e }))} value={values?.secondary_health_facility}>

                                                        {stateHealthCare?.map(item => (
                                                            <>
                                                                <Option value={item.name}>{item.name}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Contact Address" required tooltip="Contact address" style={{ marginRight: "20px" }} >
                                                    <TextArea onChange={e => setValues(d => ({ ...d, contact_address: e.target.value }))} value={values?.contact_address} showCount maxLength={250} style={{ height: 60, width: 250 }} />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="profile-password">
                                            <h3>Medical Condition</h3>
                                            <div className='form-group'>
                                                <Form.Item label="Existing Medical Condition" required tooltip="Enter your Medical Condition" style={{ marginRight: "20px" }} >
                                                    <TextArea onChange={e => setValues(d => ({ ...d, existing_medical_condition: e.target.value }))} value={values?.existing_medical_condition} showCount maxLength={250} style={{ height: 120, width: 250 }} />
                                                </Form.Item>
                                                <Form.Item label="Previous Medical Condition" required tooltip="Enter your Medical Condition">
                                                    <TextArea onChange={e => setValues(d => ({ ...d, previous_medical_condition: e.target.value }))} value={values?.previous_medical_condition} showCount maxLength={250} style={{ height: 120, width: 250 }} />
                                                </Form.Item>
                                            </div>
                                        </div>

                                        <div className="profile-button">
                                            <Form.Item>
                                                <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    
                                                    <span style={{marginRight: "10px"}}><ButtonComponent text="Submit" onClick={handlePrincipalSubmit} /></span>
                                                    <span style={{marginRight: "10px"}}><ButtonComponent text="Cancel" onClick={props.handleCancel} /></span>

                                                </div>
                                                <Loader type="Oval" color="#00BFFF" height={30} visible={loading} width={30} style={{ margin: "10px" }} />
                                                {error ? <ErrorMessage message={error} /> : null}
                                            </Form.Item>
                                        </div>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
        </>
    )
}



const ListOfDependent = (props) => {



    return (
        <div className='list_data'>
            <List>
                {props.data ?
                    <List.Item>
                        <List.Item.Meta
                            rowKey
                            // onClick={() => console.log(props.data)}
                            avatar={<Avatar src={`${uri2}${props.data?.pic_name}` ?? logom} />}
                            title={`${props.data?.first_name} ${props.data?.middle_name} ${props.data?.surname}`}
                            description={
                                <div>
                                    <h5><b style={{ fontSize: "15px" }}>Principal Account Holder</b></h5>
                                    <h5><b style={{ fontSize: "15px" }}>Policy No:</b> <span>   {props.data?.policy_no}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}> Insurance No:</b> <span>  {props.data?.insurance_no}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}>Insurance Package:</b> <span>  {props.data?.insurance_package}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}>Primary Health Care:</b> <span>  {props.data?.primary_health_facility}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}> Secondary Health Care: </b> <span> {props.data?.secondary_health_facility}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}> State: </b> <span> {props.data?.state}</span></h5>
                                    <h5><b style={{ fontSize: "15px" }}> Date: </b> <span> {props.data?.date}</span></h5>
                                </div>
                            }
                        />
                        <List.Item.Meta
                            rowKey
                            description={
                                <div>
                                    <UploadImage data={props.data} />
                                    <EditBio data={props.data} />
                                </div>
                            }
                        />
                    </List.Item>
                    :
                    null}
            </List>
            <List
                itemLayout="horizontal"
                dataSource={props?.dependentList}
                renderItem={
                    (item, ind) => (
                        <List.Item>
                            <List.Item.Meta
                                rowKey
                                // onClick={() => console.log(item)}
                                avatar={<Avatar src={`${uri2}${item.pic_name}` ?? logom} />}
                                title={<h3><b>{item.first_name} {item.middle_name} {item.surname}</b></h3>}
                                description={
                                    <div>
                                        <h6><b style={{ fontSize: "14px" }}>Dependent</b></h6>
                                        <h6><b style={{ fontSize: "14px" }}>Policy No:</b> <span>  {item.policy_no}</span></h6>
                                        <h6><b style={{ fontSize: "14px" }}> Insurance No: </b> <span>{item.insurance_no}</span></h6>
                                        <h6><b style={{ fontSize: "14px" }}>Primary Health Care: </b> <span>{item.primary_health_facility}</span></h6>
                                        <h6><b style={{ fontSize: "14px" }}> Secondary Health Care:</b> <span> {item.secondary_health_facility}</span></h6>
                                        <h6><b style={{ fontSize: "14px" }}> State:</b> <span> {item.state}</span></h6>
                                        <h6><b style={{ fontSize: "14px" }}> Date:</b> <span> {item.date}</span></h6>
                                    </div>
                                }
                            />
                            <List.Item.Meta
                                rowKey
                                description={
                                    <div>
                                        <UploadImage data={item} />
                                        <EditBio data={item} />
                                    </div>
                                }
                            />
                        </List.Item>
                    )
                }
            />
        </div>

    )
}