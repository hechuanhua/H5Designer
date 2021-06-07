import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { getImgInfo } from '../../utils/index';

const ImgSetting = props => {
	const config = useSelector(state => {
		return state.setLibrary?.current?.config;
	});
	const dispatch = useDispatch();
	console.log(config, 'config');
	const [fileList, setFileList] = useState([]);
	const [form] = Form.useForm();

	const normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		// return e && e.fileList;
	};
	const onChange = info => {
		// const { status, response } = info.file;
		// if (status !== 'uploading') {
		// 	console.log(info.file, info.fileList);
		// }
		// if (status === 'done') {
		// 	const url = response.data.url;
		// 	console.log(`${info.file.name} file uploaded successfully.`);
		// } else if (status === 'error') {
		// 	console.error(`${info.file.name} file upload failed.`);
		// }
	};

	const onValuesChange = (changedValues, allValues) => {
		console.log(changedValues, allValues,'onValuesChange')
		if (Object.keys(changedValues)[0] === 'img') {
			const { status, response } = changedValues.img.file;
			if (status === 'done') {
				let url = response.data.url;
				getImgInfo(url).then(res => {
					console.log(res, 'img');
					const h = (500 * res.height) / res.width;
					const position = {
						h,
					};
					dispatch({
						type: 'setLibrary/setting',
						payload: {
							position,
							config: {
								url: url,
							},
						},
					});
				});
			}
		} else {
			dispatch({
				type: 'setLibrary/setting',
				payload: {
					config: changedValues,
				},
			});
		}
	};
	return (
		<Form
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name="control-hooks"
			onValuesChange={onValuesChange}
		>
			<Form.Item label="上传图片：">
				<Form.Item
					name="img"
					// valuePropName="fileList"
					// getValueFromEvent={normFile}
					noStyle
					accept="image/png,image/jpeg,image/gif,image/pjpeg"
				>
					<Upload.Dragger
						name="files"
						action="http://localhost:7001/upload"
						maxCount={1}
						onChange={onChange}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">点击上传</p>
					</Upload.Dragger>
				</Form.Item>
			</Form.Item>
			<Form.Item label="固定位置" name="fixed">
				<Select allowClear>
					<Option value="current">固定当前位置</Option>
					<Option value="bottom">固定底部</Option>
				</Select>
			</Form.Item>
		</Form>
	);
};

export default ImgSetting;
