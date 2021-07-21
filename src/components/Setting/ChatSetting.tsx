import { useEffect, useRef, useState, useContext, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import Color from 'components/Common/Color'
import { chatData } from 'config/dataSoure'

const { TextArea } = Input;
const ChatSetting = () => {
	const config = useEqualSelector((state: any) => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [dataSource, setDataSource] = useState(JSON.stringify(config.data))
	console.log(config, 'ChatSettingconfig');

	const onValuesChange = (changedValues: any) => {
		if (Object.keys(changedValues)[0] === 'value') {
			const value = chatData[changedValues.value]
			setDataSource(JSON.stringify(value))
			dispatch({
				type: 'layoutData/setting',
				payload: {
					config: {
						data: value,
						value: changedValues.value
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
	const dataSourceChange = (e: ChangeEvent & { target: HTMLTextAreaElement }) => {
		const val = e.target.value
		setDataSource(val)
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: {
					data: JSON.parse(val)
				},
			},
		});
	}

	const colorChange = (color: string, type: string) => {
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: {
					[type]: color
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
			labelAlign={'left'}
		>
			<Form.Item label="线别选择" name="value">
				<Select>
					{
						config.list.map((item: any) => (
							<Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
						))
					}
				</Select>
			</Form.Item>
			<Form.Item label="数据源">
				<TextArea placeholder="" rows={8} value={dataSource} onChange={dataSourceChange} />
			</Form.Item>
			<Form.Item name="backgroundColor" label="背景颜色">
				<Color color={config.backgroundColor} onChange={(color) => { colorChange(color, 'backgroundColor') }}></Color>
			</Form.Item>
			<Form.Item name="color" label="字体颜色">
				<Color color={config.color} onChange={(color) => { colorChange(color, 'color') }}></Color>
			</Form.Item>
			<Form.Item name="fontSize" label="文字大小">
				<Input type="number" />
			</Form.Item>
			<Form.Item name="borderRadius" label="圆角">
				<Input type="text" />
			</Form.Item>
			<Form.Item name="isTransform" label="是否漏量" tooltip="开代表漏量，关代表不漏量">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>
		</Form>
	);
};

export default ChatSetting;
