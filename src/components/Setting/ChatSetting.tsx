import { useEffect, useRef, useState, useContext, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const ChatSetting = () => { 
	const config = useSelector((state:any) => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [dataSource,setDataSource] = useState(config.data)
	console.log(config, 'ChatSettingconfig');

	const onValuesChange = (changedValues:any) => {
		if(Object.keys(changedValues)[0] === 'value'){
			let val = config.dataSource[changedValues.value]
			setDataSource(val)
			dispatch({
				type: 'layoutData/setting',
				payload: {
					config: {
						data:val
					},
				},
			});
		} else {
			dispatch({
				type: 'layoutData/setting',
				payload: {
					config: changedValues,
				},
			});
		}
	};
	const onChange = (e:ChangeEvent&{target:HTMLTextAreaElement}) =>{
		const val = e.target.value
		setDataSource(val)
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: {
					data:val
				},
			},
		});
	}
	return (
		<Form
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name="control-hooks"
			onValuesChange={onValuesChange}
			initialValues={config}
		>
			<Form.Item label="线别选择" name="value">
				<Select>
					{
						config.list.map((item:any)=>(
							<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
						))
					}
				</Select>
			</Form.Item>
			<Form.Item label="数据源">
				<TextArea placeholder="" rows={8} value={dataSource} onChange={onChange} />
			</Form.Item>
			<Form.Item name="isTransform" label="是否漏量" tooltip="开代表漏量，关代表不漏量">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>
		</Form> 
	);
};

export default ChatSetting;
