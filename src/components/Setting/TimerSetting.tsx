import { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import styled from 'styled-components';

import Color from 'components/Common/Color'

const TimerSetting = () => {
	const config = useEqualSelector((state: any) => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	console.log(config, 'TimerSettingconfig');

	const onValuesChange = (changedValues: any) => {
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: changedValues,
			},
		});
	};

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
			<Form.Item name="initValue" label="初始值">
				<Input type='number'></Input>
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
				<Color color={config.backgroundColor} onChange={(color) => { colorChange(color, 'backgroundColor') }}></Color>
			</Form.Item>
			<Form.Item name="color" label="字体颜色">
				<Color color={config.color} onChange={(color) => { colorChange(color, 'color') }}></Color>
			</Form.Item>
		</Form>
	);
};

export default TimerSetting;
