
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import CommonModal from '../../../components/Common/Modal';

import { publish } from '../../../api'

const PublishModal = (props) => {
  const dispatch = useDispatch();

  const {visible,onCancel,defaultTitle} = props

  const layoutData =  useSelector(state => {
    return state.layoutData;
  });
  
  const [loading,setLoading] = useState(false)

  const [form] = Form.useForm();

  const pageData = {
    title:'',
    wechatNumber:'',
    fileName:''
  }
  // const [formData, setFormData] = useState(pageData)


  const handleOk = () => {
    form.validateFields().then(()=>{
      publish({
        layoutData,
        pageData:form.getFieldsValue()
      }).then((res)=>{
        onCancel()
        message.success('发布成功','1')
      })
    }).catch((e)=>{
      console.log(4444)
      message.error(e,'3')
    })
  }


  
  return (
    <>
      <CommonModal visible={visible} onOk={handleOk} onCancel={onCancel} title={defaultTitle?defaultTitle:'确定保存？'} confirmLoading={loading}>
        <Form name="pageData" form={form} initialValues={pageData} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Form.Item label="页面标题" name="title" rules={[{ required: true, message: '页面标题必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="默认微信号" name="wechatNumber" rules={[{ required: true, message: '默认微信号必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="文件路径" name="fileName" rules={[{ required: true, message: '文件路径必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
        </Form>
      </CommonModal>
    </>
  )
}

export default PublishModal;


