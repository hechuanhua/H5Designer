import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from "antd"

const TextSetting = props => {
  const config = useSelector(state => {
    return state.setLibrary?.current?.config
  })
  const dispatch = useDispatch();
  console.log(config, 'config')
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('config.id')
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...config
    });
  }, [config]);
  
  const onValuesChange = (changedValues, allValues) => {
    console.log(changedValues, allValues, 'changedValues')
    dispatch({
      type: "setLibrary/setting",
      payload: {
        config: changedValues
      }
    })
  }

  return (
    <Form labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }} form={form} name="control-hooks" initialValues={config} onValuesChange={onValuesChange}>
      <Form.Item name="text" label="文本">
        <Input />
      </Form.Item>
    </Form>
  );
}

export default TextSetting
