import React, { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import useEqualSelector from 'lib/hooks/useEqualSelector'
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
	const { layoutType } = useEqualSelector((state: any) => {
		return state.layoutData;
	});
	const config = useEqualSelector((state: any) => {
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
			labelAlign={'left'}
		>
			<Form.Item label="???????????????">
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
						<p className="ant-upload-text">????????????</p>
					</Upload.Dragger>
					<Image_lib onClick={()=>{setVisible(true)}}>?????????</Image_lib>
				</Form.Item>
			</Form.Item>
			<Form.Item name="borderRadius" label="??????">
				<Input type="text" />
			</Form.Item>
			{
				layoutType === 'freedom'?
				<Form.Item label="????????????" name="fixed">
					<Select allowClear>
						<Select.Option value="current">??????????????????</Select.Option>
						<Select.Option value="bottom">????????????</Select.Option>
					</Select>
				</Form.Item>:''
			}
			
			{config.fixed === 'bottom' ? (
				<Form.Item name="bottomY" label="????????????">
					<Input type="number" />
				</Form.Item>
			) : ''}

			<Form.Item name="popup" label="????????????">
				<Switch checked={config.popup}></Switch>
			</Form.Item>
			<Form.Item name="popupType" label="????????????" hidden={!config.popup}>
				<Select>
					<Select.Option value="1">????????????</Select.Option>
					<Select.Option value="2">??????????????????</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="isTransform" label="????????????" hidden={!config.popup} tooltip="????????????????????????????????????">
				<Switch checked={config.isTransform}></Switch>
			</Form.Item>

			<ImageLibrary visible={visible} onChange={ImageLibraryChange} onCancel={()=>{setVisible(false)}}></ImageLibrary>
		</Form>
	);
};

export default ImgSetting;
