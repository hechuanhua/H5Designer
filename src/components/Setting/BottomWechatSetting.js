import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const BottomWechatSetting = props => {
	const config = useSelector(state => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	console.log(config, 'BottomWechatSettingconfig');

	const onValuesChange = (changedValues, allValues) => {
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: changedValues,
			},
		});
	};
	return (
		<Form
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name="control-hooks"
			onValuesChange={onValuesChange}
			initialValues={config}
		>
			<Form.Item name="text1" label="文本1">
				<Input />
			</Form.Item>
			<Form.Item name="text2" label="文本2">
				<Input />
			</Form.Item>
			<Form.Item name="align" label="对齐方式">
				<Select>
					<Select.Option value="left">左对齐</Select.Option>
					<Select.Option value="center">居中</Select.Option>
					<Select.Option value="right">右对齐</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="fontSize" label="文字大小">
				<Input type="number" />
			</Form.Item>
			<Form.Item name="backgroundColor" label="背景颜色">
				<Input />
			</Form.Item>
			<Form.Item name="color" label="字体颜色">
				<Input />
			</Form.Item>
      <Form.Item name="borderRadius" label="圆角">
				<Input type="number"/>
			</Form.Item>
			<Form.Item name="isTransform" label="是否转换">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>
			
		</Form>
	);
};

export default BottomWechatSetting;
