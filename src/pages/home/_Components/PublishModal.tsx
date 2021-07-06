
import { useEffect, useRef, useState } from 'react';
import { Radio, Button, message, Input, Form, Select, } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import CommonModal from '../../../components/Common/Modal';
import config from '../../../config/config';
import { publish } from '../../../api'

import { RootState } from '../../../typings/LayoutData'

const { TextArea } = Input;

interface Modal {
  visible: boolean
  onCancel: () => void
  defaultTitle?: string
  children?: any
}

const PublishModal = (props: Modal) => {
  const dispatch = useDispatch();

  const { visible, onCancel, defaultTitle } = props

  const layoutData = useSelector((state: RootState) => {
    return state.layoutData;
  });

  const { hostList } = useSelector((state: RootState) => {
    return state.pageData;
  });
  console.log(hostList, 'PublishModal')
  const [loading, setLoading] = useState(false)
  const [successVisible, setSuccessVisible] = useState(false)
  const [successUrl, setSuccessUrl] = useState('')
  const [form] = Form.useForm();

  const pageData = {
    title: '',
    wechatNumber: '',
    fileName: '',
    basicsCode: '',
    transformCode: ''
  }
  const handleOk = () => {
    form.validateFields().then(() => {
      setLoading(true)
      publish({
        layoutData,
        pageData: form.getFieldsValue()
      }).then((res: any) => {
        onCancel && onCancel()
        setLoading(false)
        message.success('发布成功', 1, () => {
          setSuccessVisible(true)
          setSuccessUrl(`${res.url}`)
          window.open(`${res.url}`)
        })
      })
    }).catch((e) => {
      console.log(e)
      setLoading(false)
    })
  }

  return (
    <>
      <CommonModal visible={visible} onOk={handleOk} onCancel={() => { onCancel && onCancel(); setLoading(false) }} title={defaultTitle as string} confirmLoading={loading}>
        <Form name="pageData" form={form} initialValues={pageData} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} >
          <Form.Item label="页面标题" name="title" rules={[{ required: true, message: '页面标题必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="默认微信号" name="wechatNumber" rules={[{ required: true, message: '默认微信号必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="发布域名" name="host" rules={[{ required: true, message: '发布域名必须选择' }]} validateTrigger={['onChange', 'onBlur']}>
            <Select>
              {hostList.map(item => (
                <Select.Option key={item.host} value={item.host}>{item.host}-{item.remake}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="文件名称" name="fileName" rules={[{ required: true, message: '文件名称必须填写' }]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="基础代码" name="basicsCode" rules={[{ required: true, message: '基础代码必须填写' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && (/script>/).test(value)) {
                return Promise.reject(new Error('代码格式错误，不能包含<script>标签'));
              }
              return Promise.resolve();
            },
          }),
          ]}
            validateTrigger={['onChange', 'onBlur']}>
            <TextArea rows={4}></TextArea>
          </Form.Item>
          <Form.Item label="转换代码" name="transformCode" rules={[{ required: true, message: '转换代码必须填写' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value && !((/(meteor\.track)|(_ks_trace\.push)|(_baq\.track)/).test(value))) {
                return Promise.reject(new Error('代码格式错误，与预期代码不符'));
              }
              return Promise.resolve();
            },
          }),
          ]} validateTrigger={['onChange', 'onBlur']}>
            <Input></Input>
          </Form.Item>
        </Form>
      </CommonModal>
      <CommonModal visible={successVisible} onOk={() => { setSuccessVisible(false) }} onCancel={() => { setSuccessVisible(false) }} title={'发布成功!'}>
        <p>发布路径：<a href={successUrl}>{successUrl}</a></p>
      </CommonModal>
    </>
  )
}

// 转化代码分为基础代码与转化代码两部分。
// 基础代码:添加在您网页的<head>与</head>之间，用于收集与上报转化行为。注意：所有需要上报转化的页面中都需要添加基础代码；不支持在iframe中使用基础代码
// <!-- Bytedance Tracking -->
// <script>
// `(function(r,d,s,l){var meteor=r.meteor=r.meteor||[];meteor.methods=["track","off","on"];meteor.factory=function(method){return function(){
// var args=Array.prototype.slice.call(arguments);args.unshift(method);meteor.push(args);return meteor}};for(var i=0;i<meteor.methods.length;i++){
// var key=meteor.methods[i];meteor[key]=meteor.factory(key)}meteor.load=function(){var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);
// js.src="https://analytics.snssdk.com/meteor.js/v1/"+l+"/sdk";fjs.parentNode.insertBefore(js,fjs)};meteor.load();if(meteor.invoked){return}
// meteor.invoked=true;meteor.track("pageview")})(window,document,"script","1651336618979341")`;
// </script>
// <!-- End Bytedance Tracking -->


// 转化代码：添加在用户触发转化行为之后。例如您将用户点击电话拨打按钮定义为转化行为，那么用户在点击按钮后，执行转化代码来通知基础代码，基础代码收到通知后记录本次转化行为，发送给头条，记录为一个转化。注意：不支持在iframe中使用转化代码
//   meteor.track('wechat', {convert_id: 1701264891598859 })

export default PublishModal;




