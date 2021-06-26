
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import CommonModal from '../../../components/Common/Modal';
import config from '../../../config/config';
import { publish } from '../../../api'

const PublishModal = (props) => {
  const dispatch = useDispatch();

  const {visible,onCancel,defaultTitle} = props

  const layoutData =  useSelector(state => {
    return state.layoutData;
  });
  
  const {hostList} =  useSelector(state => {
    return state.pageData;
  });
  console.log(hostList,'PublishModal')
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
        message.success('发布成功','1',()=>{
          window.open(`${config.baseUrl}${res.url}`)
        })
      })
    }).catch((e)=>{
      console.log(e)
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
          <Form.Item label="发布域名" name="host" rules={[{ required: true, message: '发布域名必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Select>
              {hostList.map(item => (
                <Select.Option key={item.host}>{item.host}-{item.remake}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="文件名称" name="fileName" rules={[{ required: true, message: '文件名称必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
        </Form>
      </CommonModal>
    </>
  )
}

export default PublishModal;




