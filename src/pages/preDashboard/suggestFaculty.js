import React, { useState } from 'react';
import { useNotifications } from '@mantine/notifications';

import { Input, Modal, Button } from 'antd';
import Loader from "react-loader-spinner";
import helpers from '../../core/Helpers';
import { Select } from 'antd';
import { Form } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';

import lib from '../lib';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react/cjs/react.development';

const { TextArea } = Input;



const SuggestFaculty = (props) => {
    const [form] = Form.useForm();
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [stateHealthCare, setStateHealtCare] = useState([]);
    const { Option } = Select;
    const notify = useNotifications();
    const [isBioVisible, setIsBioVisible] = useState(false);
    const { set, user } = useAuth();

    const showBioModal = () => {
        setIsBioVisible(true);
    };
    const handleBioCancel = () => {
        setIsBioVisible(false);
    };

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


    const handleBioOk = async () => {

        setLoading(true);
        console.log(values);

        let reqData = await lib.suggestFacility(values)

        if (reqData.status === 'error') {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
        }
        if (reqData?.error === 1) {
            helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.message })
        }
        if (reqData?.error === 0) {
            helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: 'Suggestion sent' })
            setIsBioVisible(false);
        }
        console.log(reqData);
        setLoading(false);
    };
    return (
        <>
            <Button type="dashed" onClick={showBioModal}>Suggest A Facility</Button>
            <Modal title="Suggest HealthCare Facility" visible={isBioVisible} onOk={handleBioOk} onCancel={handleBioCancel}>
                <div className="profile-password">
                    <Form form={form} layout="vertical">
                        <div className='form-group' >
                            <Form.Item label="Name" required tooltip="Enter your name">
                                <Input onChange={e => setValues(d => ({ ...d, name: e.target.value }))} value={values?.name} placeholder="John" style={{ width: "250px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>
                        <div className='form-group' >
                            <Form.Item label="State of Residence" required tooltip={{ title: 'Enter your state', icon: <InfoCircleOutlined /> }} >
                                <Select defaultValue={"Select state"} style={{ width: "250px", marginRight: "10px" }} onChange={e => { setValues(d => ({ ...d, state: e })); }} value={values?.state}>
                                    {states?.map(item => (
                                        <>
                                            <Option value={item.value}>{item.label}</Option>
                                        </>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="City" required tooltip="Enter your city">
                                <Input onChange={e => setValues(d => ({ ...d, city: e.target.value }))} value={values?.city} placeholder="abijan" style={{ width: "250px", marginRight: "10px" }} />
                            </Form.Item>
                        </div>

                        <div className='form-group'>
                            <Form.Item label="Contact Address" required tooltip="Enter your Medical Condition" style={{ marginRight: "20px" }} >
                                <TextArea onChange={e => setValues(d => ({ ...d, address: e.target.value }))} value={values?.address} showCount maxLength={250} style={{ height: 60, width: 250 }} />
                            </Form.Item>
                        </div>



                        <Loader
                            type="Oval"
                            color="#00BFFF"
                            height={30}
                            visible={loading}
                            width={30}
                        />
                    </Form>
                </div>
            </Modal>
        </>
    )
}


export default SuggestFaculty;
