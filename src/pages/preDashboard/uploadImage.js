import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { useNotifications } from '@mantine/notifications';

import { Upload, message, Modal, Button } from 'antd';
import Loader from "react-loader-spinner";
import helpers from '../../core/Helpers';
import { Select } from 'antd';
import { Form } from 'antd';
import { useAuth } from '../../core/hooks/useAuth';

import lib from '../lib';
import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { useEffect } from 'react/cjs/react.development';




const UploadImage = (props) => {
  const [fileList, setFileList] = useState([]);
  const notify = useNotifications();
  const [loading, setLoading] = useState(false);

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const showModal = () => {
    setIsUploadVisible(true);
  };

  const handleOk = () => {
    setIsUploadVisible(false);
  };

  const handleCancel = () => {
    setIsUploadVisible(false);
  };

  const onChange = async ({ fileList: newFileList }) => {

    const isLt2M = newFileList[0]?.size / 1024 / 1024 < 6;

    if (!isLt2M) {
      console.log(isLt2M);
      message.error('Image must be less than 6MB!');
      return
    } 

      setFileList(newFileList);

      let form = new FormData();
      form.append('insurance_no', props.data.insurance_no)
      form.append('file', newFileList[0].originFileObj)

      setLoading(true);
      let reqData = await lib.sendImage(form)

      if (reqData.status === 'error') {
        helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: reqData.msg })
      }
      if (reqData?.error === 1) {
        helpers.alert({ notifications: notify, icon: 'error', color: 'red', message: "Image upload Failed" })
      }
      if (reqData?.error === 0) {
        helpers.alert({ notifications: notify, icon: 'success', color: 'green', message: reqData.message });
        setTimeout(()=> window.location.reload(), 1000)
      }
      console.log(reqData);
      setLoading(false);
    

  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };


  return (
    <>
      <Button type="text" onClick={showModal}>Edit Image</Button>
       <Modal title="Upload Identifications" visible={isUploadVisible} onOk={handleOk} onCancel={handleCancel}>

        <div className="profile-password" >
          <div className='form-group'>
            <h3>Upload Image</h3>
            <ImgCrop rotate>
              <Upload
                action="#"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
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
export default UploadImage;
 
 