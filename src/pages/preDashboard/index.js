import React, { useEffect, useState } from 'react';

import { Modal } from 'antd';
import { useNavigate } from "react-router-dom"
import logogreen from '../../assets/images/icon/logogreen.png'; // Tell webpack this JS file uses this image
import account from '../../assets/images/account.png'; // Tell webpack this JS file uses this image
import { PageHeaderComp } from '../../components/pageHeader/pageHeader';
import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { ButtonComponent } from '../../components/buttonComponent/buttonComponent';
import './preDashboard.scss';
import { Layout, Menu } from 'antd';
import { Table, Tag, Space } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/Helpers';
import lib from '../lib';
import Loader from "react-loader-spinner";
import ErrorMessage from '../../components/error/ErrorMessage';
import formValidator from '../formvalidation';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { List, Avatar } from 'antd';
import { Select } from 'antd';

import {
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons';

import { Form, Row, Col, DatePicker, Radio } from 'antd';
import { Input } from 'antd';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { Header, Footer } = Layout;

const { TextArea } = Input;



const PreDashboard = () => {
    const [formLayout,] = useState('vertical');
    const navigate = useNavigate();
    const { set, user } = useAuth();

    const [isPrincipalModalVisible, setIsPrincipalModalVisible] = useState(false);
    const [isDependentModalVisible, setIsDependentModalVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        if (!user) navigate('/login');

    })


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
        console.log(record);
        setIsModalVisible(true);
    }




    const handleOk = () => {
        setIsModalVisible(false);
    };

    const logUserOut = () => {
        helpers.logout(set);
        navigate('/login')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }} style={{ height: "100vh", width: "250px", minWidth: "250px", color: "#fff" }}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img style={{ width: "120px", textAlign: "center", margin: "auto" }} src={logogreen} />
                        </div>
                        <p style={{ marginBottom: "50px", textAlign: "center" }} >AMAN MEDICARE</p>
                        <Menu.Item key="1" onClick={showPrincipalModal} icon={<PieChartOutlined />}>
                            Create My Bio
                        </Menu.Item>
                        <Menu.Item onClick={showDependentModal} key="2" icon={<UserOutlined />}>
                            Add Dependents
                        </Menu.Item>
                        <Menu.Item onClick={logUserOut} key="3" icon={<LogoutOutlined />}>
                            Logout
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
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
                            </div>
                            <ListOfDependent onSelected={onRowSelected} />
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
    const navigate = useNavigate();
    const [value1, setValue1] = useState();
    const [values, setValues] = useState();
    const notify = useNotifications();
    const { set, user } = useAuth();

    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const onChange1 = (e) => {
        console.log('radio1 checked', e.target.value);
        setValue1(e.target.value)
    };

    const selectDate = (date, dateString) => {
        setValues(d => ({ ...d, birth_day: dateString }))
    }

    const handleDependentSubmit = async () => {
        console.log(values);

        values.policy_no = user.policy_no

        let reqData = await lib.saveDependentProfile(values)
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
        }
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

                                                <Form.Item
                                                    label="Middle Name"
                                                    tooltip={{
                                                        title: 'Enter your email address',
                                                        icon: <InfoCircleOutlined />
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, middle_name: e.target.value }))} value={values?.middle_name} placeholder="Doe" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Surname"
                                                    tooltip={{
                                                        title: 'Enter your surname',
                                                        icon: <InfoCircleOutlined />
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, surname: e.target.value }))} value={values?.surname} placeholder="Clark" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item label="Email" required tooltip="Enter Dependent Email">
                                                    <Input onChange={e => setValues(d => ({ ...d, email: e.target.value }))} value={values?.email} placeholder="example@gmail.com" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Phone number"
                                                    tooltip={{
                                                        title: 'Enter phone number',
                                                        icon: <InfoCircleOutlined />
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, phone: e.target.value }))} value={values?.phone} placeholder="09000000000" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>
                                            <div className='form-group'>
                                                <Form.Item
                                                    label="State of Residence"
                                                    tooltip={{
                                                        title: 'Enter their state of residence',
                                                        icon: <InfoCircleOutlined />
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, state: e.target.value }))} value={values?.state} placeholder="FCT" style={{ width: "250px", marginRight: "10px" }} />
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
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Religion" required tooltip="Enter your religion">
                                                    <Input onChange={e => setValues(d => ({ ...d, religion: e.target.value }))} value={values?.religion} placeholder="Islam" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Releationship"
                                                    tooltip={{
                                                        title: 'Relationship',
                                                        icon: <InfoCircleOutlined />
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, relationship: e.target.value }))} value={values?.relationship} placeholder="Spouse" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item label="Job title" required tooltip="Enter Occupation">
                                                    <Input onChange={e => setValues(d => ({ ...d, job_title: e.target.value }))} value={values?.job_title} placeholder="Engineer" style={{ width: "250px", marginRight: "10px" }} />
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
                                                    <ButtonComponent text="Submit" onClick={handleDependentSubmit} />
                                                </div>
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
    const navigate = useNavigate();
    const [values, setValues] = React.useState({});
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [loadPic, setLoadPic] = useState(false);
    const [loadID, setLoadID] = useState(false);
    const [imageUrlPic, setImageUrlPic] = useState();
    const [imageUrlID, setImageUrlID] = useState();
    const [pic, setPic] = useState();
    const [id, setId] = useState();
    const [primary_health, setPrimaryHealth] = useState([]);
    const [secondary_health, setSecondaryHealth] = useState([]);

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
        builder.pic_file = pic
        builder.id_file = id

        console.log(builder);

        let reqData = await lib.saveNewProfile(builder);
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
        }
        console.log(reqData);
        setLoading(false);

    }

    const selectDate = (date, dateString) => {
        setValues(d => ({ ...d, date_of_birth: dateString }))
    }

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButtonPic = (
        <div>
            {loadPic ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const uploadButtonID = (
        <div>
            {loadID ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChangePic = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            setLoadPic(true)
            return;
        }
        if (info.file.status === 'done') {
            setPic(info.file);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrlPic(imageUrl)
                setLoadPic(false)
            }
            );
        }
    };

    const handleChangeID = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            setLoadID(true)
            return;
        }
        if (info.file.status === 'done') {
            setId(info.file);
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrlID(imageUrl)
                setLoadID(false)
            }
            );
        }
    };

    const fetchProviders = async (e) => {
        console.log(e.toUpperCase());

        let reqData = await lib.getProviders();
        if (reqData.data?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
        }
        if (reqData.data?.error === 0 || reqData.statusText == 'OK') {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.data.message })
        }
        console.log(reqData);
        console.log(JSON.parse(reqData?.data));
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
                                                <Form.Item
                                                    label="Middle Name"
                                                    tooltip={{
                                                        title: 'Enter your email address',
                                                        icon: <InfoCircleOutlined />,
                                                    }}
                                                >
                                                    <Input placeholder="Doe" onChange={e => setValues(d => ({ ...d, middle_name: e.target.value }))} value={values?.middle_name} style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Surname"
                                                    tooltip={{
                                                        title: 'Enter your surname',
                                                        icon: <InfoCircleOutlined />,
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, surname: e.target.value }))} value={values?.surname} placeholder="Clark" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="State of Residence" required tooltip={{ title: 'Enter your state', icon: <InfoCircleOutlined /> }}>
                                                    <Select defaultValue={"Select state"} style={{ width: "250px", marginRight: "10px" }} onChange={e => {setValues(d => ({ ...d, state: e }));  fetchProviders(e); }} value={values?.state}>
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
                                                    <Radio.Group style={{ marginLeft: '20px' }} options={optionsMarital} onChange={e => setValues(d => ({ ...d, gender: e.target.value }))} value={values?.gender} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Religion" required tooltip="Enter your religion">
                                                    <Input onChange={e => setValues(d => ({ ...d, religion: e.target.value }))} value={values?.religion} placeholder="Islam" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Marital Status"
                                                    tooltip={{
                                                        title: 'Marital Status',
                                                        icon: <InfoCircleOutlined />,
                                                    }}
                                                >
                                                    <Input onChange={e => setValues(d => ({ ...d, marital_status: e.target.value }))} value={values?.marital_status} placeholder="Spouse" style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                                <Form.Item label="Job title" required tooltip="Enter Occupation">
                                                    <Input placeholder="Engineer" onChange={e => setValues(d => ({ ...d, job_title: e.target.value }))} value={values?.job_title} style={{ width: "250px", marginRight: "10px" }} />
                                                </Form.Item>
                                            </div>

                                            <div className='form-group'>
                                                <Form.Item label="Primary Health Care Facility" tooltip="Enter health care facility">
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, primary_health_facility: e }))} value={values?.primary_health_facility}>
                                                        {primary_health?.map(item => (
                                                            <>
                                                                <Option value={item.value}>{item.label}</Option>
                                                            </>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                                <Form.Item label="Secondary Health Care Facility" tooltip={{ title: 'Enter health care facility', icon: <InfoCircleOutlined /> }} >
                                                    <Select style={{ width: "250px", marginRight: "10px" }} onChange={e => setValues(d => ({ ...d, secondary_health_facility: e }))} value={values?.secondary_health_facility}>
                                                        {secondary_health?.map(item => (
                                                            <>
                                                                <Option value={item.value}>{item.label}</Option>
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


                                        <div className="profile-password">
                                            <h3>Upload Identifications</h3>
                                            <div className='form-group'>
                                                <Form.Item label="Picture" required tooltip="Enter Identification" style={{ marginRight: "20px" }} >
                                                    <Upload
                                                        name="pic_file"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        action="http://app.amanmedicare.org/?save-new-profile"
                                                        beforeUpload={beforeUpload}
                                                        onChange={handleChangePic}
                                                    >
                                                        {imageUrlPic ? <img src={imageUrlPic} alt="avatar" style={{ width: '100%' }} /> : uploadButtonPic}
                                                    </Upload>
                                                </Form.Item>
                                                <Form.Item label="Identification Document" required tooltip="Enter Identification">
                                                    <Upload
                                                        name="id_file"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        action="http://app.amanmedicare.org/?save-new-profile"
                                                        beforeUpload={beforeUpload}
                                                        onChange={handleChangeID}
                                                    >
                                                        {imageUrlID ? <img src={imageUrlID} alt="avatar" style={{ width: '100%' }} /> : uploadButtonID}
                                                    </Upload>
                                                </Form.Item>
                                            </div>
                                        </div>




                                        <div className="profile-button">
                                            <Form.Item>
                                                <div style={{ display: "flex", marginBottom: "10px" }}>
                                                    <ButtonComponent text="Submit" onClick={handlePrincipalSubmit} />
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


const TableSelected = (props) => {
    return (
        <Modal title="Basic Modal" visible={props.isModalVisible} onOk={props.handleOk} onCancel={props.handleCancel}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}


const TableData = (props) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <img style={{ width: "80px", height: "60px", borderRadius: "500px" }} src={account} />,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    return (
        <Table
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => { props.onSelected(record, rowIndex) }, // click row
                }
            }}
            columns={columns} dataSource={data} />
    )
}



const ListOfDependent = () => {
    const data = [
        {
            title: 'Ant Design Title 1',
            description: "wswsw ewjdkwednwe dewkdjnewdkewj dewdwe"
        },
        {
            title: 'Ant Design Title 2',
            description: "wswsw ewjdkwednwe dewkdjnewdkewj dewdwe"

        },
        {
            title: 'Ant Design Title 3',
            description: "wswsw ewjdkwednwe dewkdjnewdkewj dewdwe"

        },
        {
            title: 'Ant Design Title 4',
            description: "wswsw ewjdkwednwe dewkdjnewdkewj dewdwe"

        },
    ];

    return (
        <div className='list_data'>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={(item, ind) => (
                    <List.Item>
                        <List.Item.Meta
                            rowKey
                            onClick={() => console.log(item)}
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title={item.title}
                            description={
                                <div><p>{item.de}</p>
                                    <p>or background applications,</p>
                                    <p>is refined by Ant UED Team</p></div>}
                        />
                    </List.Item>
                )
                }
            />
        </div>

    )
}