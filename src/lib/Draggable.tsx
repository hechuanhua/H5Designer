import React, { DragEvent, useMemo } from 'react';
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
import Timer from '../Library/Timer';

import { Layout, LayoutConfig } from '../../typings/LayoutData'

const libraryTypeArray = ['img', 'text', 'radio', 'bottomWechat', 'chat', 'timer']
interface FlowDomProps {
	flowLayout: Array<Layout>,
	current?: Layout,
	removeItem?: any,
	showPopup: (e: any) => void,
	blur?: any,
	type?: string
}

export const generateFlowDOM = (props: FlowDomProps) => {
	let { flowLayout, current = { id: '' }, removeItem, showPopup, blur, type } = props
	return flowLayout.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-id={item.id}
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
					data-id={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
					style={{
						width: item.position.w,
						height: item.position.h,
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius as any) ? item.config.borderRadius + 'px' : item.config.borderRadius,
					} as React.CSSProperties}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewText config={item.config} blur={blur} showPopup={showPopup} type={type}></PreviewText>
				</div>
			);
		} else if (item.config.type == 'radio') {
			return (
				<div
					key={item.id}
					data-id={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
					style={{
						width: item.position.w,
						height: item.position.h,
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius as any) ? item.config.borderRadius + 'px' : item.config.borderRadius,
					} as React.CSSProperties}

				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewRadio config={item.config} id={item.id}></PreviewRadio>
				</div>
			);
		} else if (item.config.type == 'chat') {
			return (
				<div
					key={item.id}
					data-id={item.id}
					className={item.id === current.id ? 'active' : ''}
					data-grid={item.position}
					style={{
						width: item.position.w,
					} as React.CSSProperties}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<ChatDialog config={item.config} type={type} ></ChatDialog>
				</div>
			);
		} else if (item.config.type == 'timer') {
			return (
				<div
					key={item.id}
					data-id={item.id}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<Timer config={item.config}></Timer>
				</div>
			);
		}
	});
};

interface FreeDomProps {
	config: LayoutConfig,
	showPopup: any,
	blur?: any,
	type?: string,
	id?: string | undefined
}

export const generateFreedomDOM = (props: FreeDomProps) => {
	const { config, type, blur, showPopup, id } = props
	if (!config) return null;
	if (config.type == 'img') {
		return <PreviewImage config={config} showPopup={showPopup}></PreviewImage>;
	} else if (config.type == 'text') {
		return <PreviewText config={config} blur={blur} showPopup={showPopup} type={type}></PreviewText>;
	} else if (config.type == 'radio') {
		return <PreviewRadio config={config} id={id}></PreviewRadio>;
	} else if (config.type == 'chat') {
		return <ChatDialog config={config} type={type}></ChatDialog>;
	} else if (config.type == 'bottomWechat') {
		return <BottomWechat config={config}></BottomWechat>;
	} else if (config.type == 'timer') {
		return <Timer config={config}></Timer>;
	}
};

interface DropProps {
	e?: Event | DragEvent,
	dispatch: any,
	type?: string,
	data?: Layout
}

export const onDrop = (props: DropProps) => {
	console.log('onDroponDroponDrop')
	const { e, dispatch, type, data } = props
	let y = 0;
	let x = 0
	let position = {}
	let libraryType = ''
	let payload = {}
	const id = createUuid(6);
	if (type === 'contextmenu') {  //右键新增
		payload = {
			...data,
			position: {
				...data?.position,
			},
			id
		};
	} else {
		y = (e as DragEvent).pageY - 100;
		libraryType = (e as DragEvent).dataTransfer.getData('text');
		if (!libraryTypeArray.includes(libraryType)) {
			return
		}
		console.log(libraryType, '类型');
		position = {
			x,
			y,
			w: initData[libraryType].w,
			h: initData[libraryType].h,
		};
		console.log(position, 'position')
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
