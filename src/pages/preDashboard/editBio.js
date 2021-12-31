import React, { useState } from 'react';
import { useNotifications } from '@mantine/notifications';

import {Modal, Button } from 'antd';
import Loader from "react-loader-spinner";
import helpers from '../../core/Helpers';
import { Select } from 'antd';
import { Form } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';

import lib from '../lib';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useEffect } from 'react/cjs/react.development';



const EditBio = (props) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [stateHealthCare, setStateHealtCare] = useState([]);
  const { Option } = Select;
  const notify = useNotifications();
  const [isBioVisible, setIsBioVisible] = useState(false);
  const { user } = useAuth();



  const showBioModal = () => {
    setIsBioVisible(true);
  }; 
  const handleBioCancel = () => {
    setIsBioVisible(false);
  };



  useEffect(() => {

    (async () => {
      let obj = {
        state: props.data?.state,
        plan_type: user?.insurance_package
      }
      let reqData = await lib.getProviders(obj);

      if (reqData.data?.error === 1) {
        helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.data.message })
      }
      if (reqData?.error === 0) {
        setStateHealtCare(reqData.data)
      }
    })()
  },[notify, props.data?.state,user?.insurance_package])


  const handleBioOk = async () => {


    values.insurance_no = props.data?.insurance_no

    setLoading(true);

    let obj = {
      what: props.data.status,
      data: values
    }
    console.log(obj);
    let reqData = await lib.updateBio(obj)

    if (reqData.status === 'error') {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
    }
    if (reqData?.error === 1) {
      helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.message })
    }
    if (reqData?.error === 0) {
      helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.message })
          setIsBioVisible(false);
      // setTimeout(()=> window.location.reload(), 1500);
    }
    console.log(reqData);
    setLoading(false);
  };


  return (
    <>
    <Button type="text" onClick={showBioModal}>Edit Bio</Button>
      <Modal title="Edit Healthcare Facility" visible={isBioVisible} onOk={handleBioOk} onCancel={handleBioCancel}>
        <div className="profile-password" >
          <div className='form-group'>
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

            <Loader
              type="Oval"
              color="#00BFFF"
              height={30}
              visible={loading}
              width={30}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}


export default EditBio;