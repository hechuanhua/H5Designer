import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";
import { Form, Input, Button, Select, Radio } from "antd"
import { PlusOutlined } from '@ant-design/icons';

const Icon = styled.div.attrs(props => ({
  className: 'iconfont'
}))`
  font-size:30px
`
const RadioItem = styled.div`
display:flex;
align-item:center;
cursor: pointer;
`
const Edit = styled.div`
cursor: pointer;
font-size:16px;
`
const RadioSetting = (props) => {
  const { current } = props
  const dispatch = useDispatch();
  console.log(current, 'current11')
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
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
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={values} onValuesChange={onValuesChange} size={25}>
      <Form.Item name="text" label="标题">
        <Input/>
      </Form.Item>
      <Form.Item name="text" label="选项">
        <Radio.Group>
          <RadioItem>
            <Radio value="a">
              <Input/>
            </Radio>
            <Icon>&#xe68a;</Icon>
            <Icon>&#xe6bf;</Icon>
          </RadioItem>
          
          <RadioItem>
            <Radio value="b">
              <Input/>
            </Radio>
            <Icon>&#xe68a;</Icon>
            <Icon>&#xe6bf;</Icon>
          </RadioItem>

          <RadioItem>
            <Radio value="c">
              <Input/>
            </Radio>
            <Icon>&#xe68a;</Icon>
            <Icon>&#xe6bf;</Icon>
          </RadioItem>
        </Radio.Group>
        <Edit>批量编辑</Edit>
      </Form.Item>
    </Form>
  );
}

export default RadioSetting

