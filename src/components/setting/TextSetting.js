import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select } from 'antd';

const TextSetting = props => {
	const config = useSelector(state => {
		return state.setLibrary?.current?.config;
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

	const onValuesChange = (changedValues, allValues) => {
		// return
		console.log(changedValues, allValues, 'changedValues');
		dispatch({
			type: 'setLibrary/setting',
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
				<Input />
			</Form.Item>
			<Form.Item name="color" label="字体颜色">
				<Input />
			</Form.Item>
			<Form.Item name="fixed" label="固定位置">
				<Select allowClear>
					<Select.Option value="current">固定当前位置</Select.Option>
					<Select.Option value="bottom">固定底部</Select.Option>
				</Select>
			</Form.Item>
			{config.fixed === 'bottom' ? (
				<Form.Item name="bottomY" label="距离底部">
					<Input type="number" />
				</Form.Item>
			) : (
				''
			)}
		</Form>
	);
};

export default TextSetting;
