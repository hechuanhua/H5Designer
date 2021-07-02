import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';

import { createUuid } from '../../utils/index';
import initData from '../../config/initData';

import PreviewImage from '../Library/Image';
import PreviewRadio from '../Library/Radio';
import PreviewText from '../Library/Text';
import RemoveIcon from '../Library/RemoveIcon';
import ChatDialog from '../Library/ChatDialog';
import BottomWechat from '../Library/BottomWechat';


export const generateFlowDOM = ({ flowLayout, current, removeItem, showPopup, blur, type }) => {
	current = current || {};

	return flowLayout.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewImage config={item.config} showPopup={showPopup}></PreviewImage>
				</div>
			);
		} else if (item.config.type == 'text') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
					style={{
						width: item.position.w,
						height: item.position.h,
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius)? item.config.borderRadius + 'px':item.config.borderRadius,
					}}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewText config={item.config} blur={blur} showPopup={showPopup} type={type}></PreviewText>
				</div>
			);
		} else if (item.config.type == 'radio') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
					style={{
						width: item.position.w,
						height: item.position.h,
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius)? item.config.borderRadius + 'px':item.config.borderRadius,
					}}

				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewRadio config={item.config} id={item.id}></PreviewRadio>
				</div>
			);
		} else if (item.config.type == 'chat') {
			return (
				<div
					key={item.id}
					// data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<ChatDialog config={item.config} type={type}></ChatDialog>;
				</div>
			);
		}
	});
};

export const generateFreedomDOM = ({ config, type, blur, showPopup }) => {
	if (!config) return null;
	if (config.type == 'img') {
		return <PreviewImage config={config} showPopup={showPopup}></PreviewImage>;
	} else if (config.type == 'text') {
		return <PreviewText config={config} blur={blur} showPopup={showPopup} type={type}></PreviewText>;
	} else if (config.type == 'radio') {
		return <PreviewRadio config={config} id={config.id}></PreviewRadio>;
	} else if (config.type == 'chat') {
		return <ChatDialog config={config} type={type}></ChatDialog>;
	} else if (config.type == 'bottomWechat') {
		return <BottomWechat config={config} type={type}></BottomWechat>;
	}
};

export const onDrop = ({e, dispatch, type, data}) => {
	let y = 0;
	let x = 0
	let position = {}
	let libraryType = ''
	let payload = {}
	const id = createUuid(6);
	if(type === 'contextmenu'){  //右键新增
		payload = {
			...data,
			position:{
				...data.position,
				i:id,
			},
			id
		};
	} else {
		y = e.pageY - 100;
		libraryType = e.dataTransfer.getData('text');
		if (libraryType !== 'img' && libraryType !== 'radio' && libraryType !== 'text' && libraryType !== 'chat' && libraryType !== 'bottomWechat') return;
		console.log(libraryType, '类型');
		position = {
			x,
			y,
			w: initData[libraryType].w,
			h: initData[libraryType].h,
			i: id,
		};
		console.log(position,'position')
		payload = {
			id,
			position,
			config: initData[libraryType].config,
		};
	}
	
	dispatch({
		type: 'layoutData/add',
		payload: payload,
	});
};
