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
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const values = { text: config.text }
  // useEffect(() => {
  //   form.setFieldsValue({
  //     text: config.text
  //   })
  // }, [id])

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
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={values} onValuesChange={onValuesChange}>
      <Form.Item name="text" label="文本">
        <Input />
      </Form.Item>
    </Form>
  );
}

export default TextSetting
