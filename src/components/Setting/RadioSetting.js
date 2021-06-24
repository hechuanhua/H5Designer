import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Radio, Checkbox, Modal, Switch } from 'antd';
import Draggable from 'react-draggable';
import CommonModal from '../Common/Modal';

const { TextArea } = Input;
const { Option } = Select;
const Icon = styled.div.attrs(props => ({
	className: 'iconfont',
}))`
	font-size: 30px;
`;
const RadioItem = styled.div`
	display: flex;
	align-item: center;
	cursor: pointer;
`;
const Edit = styled.div`
	cursor: pointer;
	font-size: 16px;
	text-align: right;
`;

const RadioSetting = props => {
	const config = useSelector(state => {
		return state.layoutData?.current?.config;
	});
  
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	console.log(config, 'RadioSettingconfig');

	useEffect(() => {
		console.log('config.id');
		form.setFieldsValue({
			...form.getFieldsValue(),
			...config,
		});
	}, [config]);

	const onValuesChange = (changedValues, allValues) => {
		console.log(changedValues, allValues, 'changedValues');
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config: allValues,
			},
		});
	};

	const [visible, setVisible] = useState(false);
	const handleOk = () => {
		const newConfig = { ...config, list: labelArr };
		console.log(newConfig, 999);
		dispatch({
			type: 'layoutData/setting',
			payload: {
				...config,
				config: newConfig,
			},
		});
		setVisible(false);
	};
	const [textAreaValue, setTextAreaValue] = useState('');
	const openModal = () => {
		let list = config.list.map(item => item.label);
		list = list.join('\n');
		console.log(list, 'list');
		setTextAreaValue(list);
		setVisible(true);
	};
	const handleCancel = () => {
		setVisible(false);
	};

	const [labelArr, setLabelArr] = useState([]);

	const changeTextArea = e => {
		console.log(e);
		setTextAreaValue(e.target.value);
		let val = e.target.value;
		val = val.split(/\n/g);
		const list = val.map(item => ({
			label: item,
		}));

		setLabelArr(list);
	};

	const changeCheckBox = checked => {
		console.log(checked);
	};

	return (
		<div>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				form={form}
				name="control-hooks"
				initialValues={config}
				onValuesChange={onValuesChange}
				size={'middle'}
			>
				<Form.Item name="title" label="标题">
					<Input />
				</Form.Item>
				<Form.Item label="选项">
					{config.isCheckBox ? (
						<Checkbox.Group name={'radio'}>
							<Form.List name="list">
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, fieldKey, ...restField }) => (
											<RadioItem key={key}>
												<Checkbox>
													<Form.Item
														{...restField}
														name={[name, 'label']}
														fieldKey={[fieldKey, 'label']}
													>
														<Input />
													</Form.Item>
												</Checkbox>
												<Icon onClick={() => add({ label: '' })}>&#xe68a;</Icon>
												<Icon onClick={() => remove(name)}>&#xe6bf;</Icon>
											</RadioItem>
										))}
									</>
								)}
							</Form.List>
						</Checkbox.Group>
					) : (
						<Radio.Group name={'radio'}>
							<Form.List name="list">
								{(fields, { add, remove }) => (
									<>
										{fields.map(({ key, name, fieldKey, ...restField }) => (
											<RadioItem key={key}>
												<Radio>
													<Form.Item
														{...restField}
														name={[name, 'label']}
														fieldKey={[fieldKey, 'label']}
													>
														<Input />
													</Form.Item>
												</Radio>
												<Icon onClick={() => add({ label: '' })}>&#xe68a;</Icon>
												<Icon onClick={() => remove(name)}>&#xe6bf;</Icon>
											</RadioItem>
										))}
									</>
								)}
							</Form.List>
						</Radio.Group>
					)}

					<Edit onClick={openModal}>批量编辑</Edit>
				</Form.Item>
				<Form.Item label="布局方式" name="layoutType">
					<Select>
						<Select.Option value="1">一行一列</Select.Option>
						<Select.Option value="2">一行二列</Select.Option>
						<Select.Option value="3">一行三列</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="是否多选" name="isCheckBox">
					<Switch onChange={changeCheckBox} checked={config.isCheckBox}></Switch>
				</Form.Item>
				<Form.Item name="backgroundColor" label="背景颜色">
					<Input />
				</Form.Item>
				<Form.Item label="样式" name="templateVal">
					<Select>
						{
							config.template.map(item=>(
								<Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>
							))
						}
					</Select>
				</Form.Item>
				
			</Form>
			<CommonModal visible={visible} onOk={handleOk} onCancel={handleCancel} title={'批量编辑'}>
				<div>每个选项请单列一行</div>
				<TextArea
					placeholder=""
					allowClear
					onChange={changeTextArea}
					rows={8}
					value={textAreaValue}
				/>
			</CommonModal>
		</div>
	);
};

export default RadioSetting;
