import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ChatSetting = props => {
	const config = useSelector(state => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	console.log(config, 'ChatSettingconfig');

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
			<Form.Item name="data" label="数据源">
				<TextArea placeholder="" allowClear rows={8} />
			</Form.Item>
			<Form.Item name="isTransform" label="是否转换">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>
		</Form>
	);
};

export default ChatSetting;
