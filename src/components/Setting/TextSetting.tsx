import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select, Switch } from 'antd';
import Color from '../Common/Color'

const TextSetting = () => {
	const config = useSelector((state: any) => {
		return state.layoutData?.current?.config;
	});

	const dispatch = useDispatch();
	const [form] = Form.useForm();
	console.log(config, 'TextSettingconfig');

	useEffect(() => {
		console.log('config.id');
		form.setFieldsValue({
			...form.getFieldsValue(),
			...config,
		});
	}, [config]);


	const onValuesChange = (changedValues: any, allValues: any) => {
		console.log(changedValues, allValues, 'changedValues');
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
			initialValues={config}
			onValuesChange={onValuesChange}
		>
			<Form.Item name="text" label="文本">
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
				<Color color={config.backgroundColor} onChange={(color) => { colorChange(color, 'backgroundColor') }}></Color>
			</Form.Item>
			<Form.Item name="color" label="字体颜色">
				<Color color={config.color} onChange={(color) => { colorChange(color, 'color') }}></Color>
			</Form.Item>
			<Form.Item name="borderRadius" label="圆角">
				<Input type="text" />
			</Form.Item>
			<Form.Item name="fixed" label="固定位置">
				<Select allowClear>
					<Select.Option value="current">固定当前位置</Select.Option>
					<Select.Option value="bottom">固定底部</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="bottomY" label="距离底部" hidden={config.fixed !== 'bottom'}>
				<Input type="number" />
			</Form.Item>
			<Form.Item name="popup" label="点击弹窗">
				<Switch checked={config.popup}></Switch>
			</Form.Item>
			<Form.Item name="popupType" label="弹窗样式" hidden={!config.popup}>
				<Select>
					<Select.Option value="1">默认弹窗</Select.Option>
					<Select.Option value="2">祛痘测肤弹窗</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="isTransform" label="是否漏量" hidden={!config.popup} tooltip="开代表漏量，关代表不漏量">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>
		</Form>
	);
};

export default TextSetting;
