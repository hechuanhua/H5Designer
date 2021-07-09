import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined, } from '@ant-design/icons';
import styled from 'styled-components';

import { getImgInfo } from 'utils/index';
import globalConfig from 'config/config'
import initData from 'config/initData';

import ImageLibrary from 'components/Common/ImageLibrary'

const Image_lib = styled.div`
	color: #1890ff;
	margin-top: 10px;
	text-align: center;
	cursor: pointer;
	font-size: 18px;
`
const ImgSetting = () => {
	const { layoutType } = useSelector((state: any) => {
		return state.layoutData;
	});
	const config = useSelector((state: any) => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	const [visible, setVisible] = useState(false)
	console.log(config, 'ImgSettingconfig');

	// const normFile = e => {
	// 	console.log('Upload event:', e);
	// 	if (Array.isArray(e)) {
	// 		return e;
	// 	}
	// 	// return e && e.fileList;
	// };
	const onValuesChange = (changedValues: any, allValues: any) => {
		console.log(changedValues, allValues, 'onValuesChange')
		if (Object.keys(changedValues)[0] === 'img') {
			const { status, response } = changedValues.img.file;
			if (status === 'done') {
				let url = `${globalConfig.staticImg}${response.data.url}`;
				console.log(url, 'url111')
				getImgInfo(url).then((res: any) => {
					console.log(res, 'img');
					const h = (initData.maxWidth * res.height) / res.width;
					const position = {
						h,
					};
					dispatch({
						type: 'layoutData/setting',
						payload: {
							position,
							config: {
								url: response.data.url,
							},
						},
					});
				});
			}
		} else {
			dispatch({
				type: 'layoutData/setting',
				payload: {
					config: changedValues,
				},
			});
		}
	};

	const getExtraData = (file: any) => {
		console.log(file)
		return { ossPath: 'common/marketing/H5Designer' }
	}

	const ImageLibraryChange = (data:{id:number,url:string,create_time:number}) => {
		console.log(data)
		if(!data)return
		const fullUrl = `${globalConfig.staticImg}${data.url}`;
		getImgInfo(fullUrl).then((res: any) => {
			console.log(res, 'img');
			const h = (initData.maxWidth * res.height) / res.width;
			const position = {
				h,
			};
			dispatch({
				type: 'layoutData/setting',
				payload: {
					position,
					config: {
						url: data.url,
					},
				},
			});
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
			<Form.Item label="上传图片：">
				<Form.Item
					name="img"
					// valuePropName="fileList"
					// getValueFromEvent={normFile}
					noStyle
				>
					<Upload.Dragger
						name="files"
						action={`${globalConfig.fileUpload}`}
						data={getExtraData}
						maxCount={1}
						accept="image/png,image/jpeg,image/gif,image/pjpeg"
					// fileList={[{url:config.url,name:config.url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)?config.url.match(/\/(\w+\.(?:png|jpg|gif|bmp))$/i)[1]:'defaultImg'}]}
					// onChange={onChange}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">点击上传</p>
					</Upload.Dragger>
					<Image_lib onClick={()=>{setVisible(true)}}>图片库</Image_lib>
				</Form.Item>
			</Form.Item>
			<Form.Item name="borderRadius" label="圆角">
				<Input type="text" />
			</Form.Item>
			{
				layoutType === 'freedom'?
				<Form.Item label="固定位置" name="fixed">
					<Select allowClear>
						<Select.Option value="current">固定当前位置</Select.Option>
						<Select.Option value="bottom">固定底部</Select.Option>
					</Select>
				</Form.Item>:''
			}
			
			{config.fixed === 'bottom' ? (
				<Form.Item name="bottomY" label="距离底部">
					<Input type="number" />
				</Form.Item>
			) : ''}

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

			<ImageLibrary visible={visible} onChange={ImageLibraryChange} onCancel={()=>{setVisible(false)}}></ImageLibrary>
		</Form>
	);
};

export default ImgSetting;
