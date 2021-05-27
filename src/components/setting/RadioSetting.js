import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Radio, Modal } from 'antd';
import Draggable from 'react-draggable';
import CommonModal from '../common/Modal';

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
	const { current } = props;
	const dispatch = useDispatch();
	console.log(current, 'current11');
	const [form] = Form.useForm();

	const values = current.config

	useEffect(() => {
		console.log('current.id')
		form.setFieldsValue({
			...form.getFieldsValue(),
			...current.config
		});
	}, [current.id]);


	const onValuesChange = (changedValues, allValues) => {
		console.log(changedValues, allValues, 'changedValues');
		dispatch({
			type: 'setLibrary/setting',
			payload: {
				config: changedValues,
			},
		});
	};

	const [visible, setVisible] = useState(false);
	const handleOk = () => {
		setVisible(false);
	};
	const handleCancel = () => {
		setVisible(false);
	};

	const textAreaChange = e => {
		console.log(e);
	};
	return (
		<div>
			<Form
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				form={form}
				name="control-hooks"
				initialValues={values}
				onValuesChange={onValuesChange}
				size={'middle'}
			>
				<Form.Item name="title" label="标题">
					<Input />
				</Form.Item>
				<Form.Item label="选项">
					<Radio.Group>
						<RadioItem>
							<Radio>
								<Form.Item name="text1">
									<Input />
								</Form.Item>
							</Radio>
							<Icon>&#xe68a;</Icon>
							<Icon>&#xe6bf;</Icon>
						</RadioItem>

						<RadioItem>
							<Radio>
								<Form.Item name="text2">
									<Input />
								</Form.Item>
							</Radio>
							<Icon>&#xe68a;</Icon>
							<Icon>&#xe6bf;</Icon>
						</RadioItem>

						<RadioItem>
							<Radio>
								<Form.Item name="text3">
									<Input />
								</Form.Item>
							</Radio>
							<Icon>&#xe68a;</Icon>
							<Icon>&#xe6bf;</Icon>
						</RadioItem>

						<Form.List name="users">
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, fieldKey, ...restField }) => (
										// <Form.Item
										// key={key}
										// 	{...restField}
										// 	name={[name, 'first']}
										// 	fieldKey={[fieldKey, 'first']}
										// 	rules={[{ required: true, message: 'Missing first name' }]}
										// >
										// 	<Input placeholder="First Name" />
										// </Form.Item>
										<RadioItem
											key={key}
											{...restField}
											name={[name, 'first']}
											fieldKey={[fieldKey, 'first']}
										>
											<Radio>
												<Form.Item>
													<Input />
												</Form.Item>
											</Radio>
											<Icon onClick={() => add()}>&#xe68a;</Icon>
											<Icon onClick={() => remove()}>&#xe6bf;</Icon>
										</RadioItem>
									))}
									<Form.Item>
										<Button type="dashed" onClick={() => add()} block>
											Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</Radio.Group>

					<Edit
						onClick={() => {
							setVisible(true);
						}}
					>
						批量编辑
					</Edit>
				</Form.Item>
				<Form.Item label="布局方式" name="layoutType">
					<Select>
						<Option value="1">一行一列</Option>
						<Option value="2">一行二列</Option>
						<Option value="3">一行三列</Option>
					</Select>
				</Form.Item>
			</Form>
			<CommonModal visible={visible} onOk={handleOk} onCancel={handleCancel}>
				<div>每个选项请单列一行</div>
				<TextArea placeholder="" allowClear onChange={textAreaChange} rows={8} />
			</CommonModal>
		</div>
	);
};

export default RadioSetting;
