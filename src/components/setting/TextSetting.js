import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { Form, Input, Button, Select } from "antd"
import { PlusOutlined } from '@ant-design/icons';

const TextSetting = (props) => {
  const { current } = props
  const dispatch = useDispatch();
  console.log(current, 'current11')
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log(values);
  };
  // const [values, setValues] = useState({ text: current.config.text });
  const values = {text:current.config.text}
  useEffect(()=>{
    form.setFieldsValue({
      text: current.config.text
    })
  },[current.id])

  useEffect(() => {
    console.log(values, 'values')
    dispatch({
      type: "setLibrary/setting",
      payload: {
        config: {
          text: values.text
        }
      }
    })
  }, [values]);

  const onValuesChange = (changedValues,allValues) =>{
    console.log(changedValues,allValues,'changedValues')
    dispatch({
      type: "setLibrary/setting",
      payload: {
        config: changedValues
      }
    })
  }

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={values} onValuesChange={onValuesChange}>
      <Form.Item name="text" label="文本">
        <Input/>
      </Form.Item>
    </Form>
  );
}

export default TextSetting
