import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { generateFreedomDOM, onDrop } from './generateDom';
import initData from '../../config/initData';
import BottomWechat from '../Library/BottomWechat';
import RemoveIcon from '../Library/RemoveIcon';

import { Layout, LayoutState, RootState } from '../../typings/LayoutData'

const FreedomDragBox = styled.div`
	width: ${initData.maxWidth}px;
	margin: 0 auto;
	border: 1px solid #ddd;
	min-height:  ${initData.height}px;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	background: transparent;
	&.active{
		z-index: 20;
		pointer-events: auto;
	}
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
	background:#EEEEEE;
	user-select: none;
	div[class*="point-"],.iconfont{
		display:none;
	}
	&.active{
		border: 1px solid #000;
		z-index:1;
		div[class*="point-"],.iconfont{
			display:block;
		}
	}
	img {
		width: 100%;
		max-height: 100%;
		user-select: none;
	}
`;
const EditorPoint = styled.div`
	position: absolute;
	background: #333;
	width: 10px;
	height: 10px;
	&.point-top {
		top: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: s-resize;
	}
	&.point-right {
		right: -5px;
		top: 50%;
		margin-top: -5px;
		cursor: e-resize;
	}
	&.point-bottom {
		bottom: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: s-resize;
	}
	&.point-left {
		left: -5px;
		top: 50%;
		margin-top: -5px;
		cursor: e-resize;
	}

	&.point-top-right {
		right: -5px;
		top: -5px;
		cursor: nesw-resize;
	}
	&.point-bottom-right {
		right: -5px;
		bottom: -5px;
		cursor: nwse-resize;
	}
	&.point-bottom-left {
		bottom: -5px;
		left: -5px;
		cursor: nesw-resize;
	}
	&.point-top-left {
		top: -5px;
		left: -5px;
		cursor: nwse-resize;
	}
`;

interface RefObject {
	mouseInfo?: {
		mouseDown: boolean,
		mouseMove: boolean,
		top?: number,
		left?: number,
		width?: number,
		height?: number,
		startX: number,
		startY: number,
		styleLeft: number,
		styleTop: number,
		styleWidth: number,
		styleHeight: number,
		className: string,
		index: number,
		id: string,
		type: string
	}
}

const Drag = () => {
	const dispatch = useDispatch();
	const { freedomLayout, current, layoutType } = useSelector((state: RootState) => {
		return state.layoutData;
	});
	const { pageHeight, wechatPopup } = useSelector((state: RootState) => {
		return state.pageData;
	});

	const page = useRef<RefObject>();


	const [layout, setLayout] = useState(freedomLayout);
	console.log(freedomLayout, 'freedomLayoutfreedomLayout')
	useEffect(() => {
		setLayout(freedomLayout);
	}, [freedomLayout]);


	function queryParent<T = Element>(target: any): T {
		if (target.className.indexOf('drag') > -1) {
			return target;
		} else {
			target = target.parentElement;
			return queryParent(target);
		}
	}

	const down = (e: MouseEvent, index: number, type: string) => {
		const eTarget = e.target as HTMLElement
		const className = eTarget.className.replace(/(.*)point-/, '');
		const target = queryParent(e.target) as HTMLElement;
		const id = target.getAttribute('data-id') as string;
		if (!page.current) return
		page.current.mouseInfo = {
			mouseDown: true,
			mouseMove: false,
			startX: e.pageX,
			startY: e.pageY,
			styleLeft: parseInt(target.style.left) || 0,
			styleTop: parseInt(target.style.top) || 0,
			styleWidth: parseInt(target.style.width) || 0,
			styleHeight: parseInt(target.style.height) || 0,
			className: className,
			index,
			id,
			type
		};
		console.log('down', JSON.parse(JSON.stringify(page.current.mouseInfo)), id);
		setTimeout(() => {
			dispatch({
				type: 'layoutData/setActive',
				payload: {
					id,
				},
			});
		}, 0);
	};
	const move = (e: MouseEvent) => {
		if (!page.current || !page.current.mouseInfo || !page.current.mouseInfo.mouseDown || page.current.mouseInfo.type === 'bottomWechat') return;
		e.stopPropagation();
		e.preventDefault();
		const { styleWidth, styleHeight, styleTop, styleLeft, index, className, startX, startY } =
			page.current.mouseInfo;
		let moveX = e.pageX - startX;
		let moveY = e.pageY - startY;
		let top = styleTop;
		let left = styleLeft;
		let width = styleWidth;
		let height = styleHeight;
		switch (className) {
			case 'top':
				height = styleHeight - moveY;
				top = styleTop + moveY;
				break;
			case 'right':
				width = moveX + styleWidth;
				break;
			case 'bottom':
				height = moveY + styleHeight;
				break;
			case 'left':
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;
			case 'top-right':
				height = styleHeight - moveY;
				width = moveX + styleWidth;
				top = styleTop + moveY;
				break;
			case 'bottom-right':
				height = moveY + styleHeight;
				width = moveX + styleWidth;
				break;
			case 'bottom-left':
				height = moveY + styleHeight;
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;
			case 'top-left':
				height = styleHeight - moveY;
				top = styleTop + moveY;
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;

			default:
				left = Number(styleLeft) + moveX;
				top = Number(styleTop) + moveY;
				if (width + left > initData.maxWidth) {
					left = initData.maxWidth - width;
				}
				if (height + top > initData.maxHeight) {
					top = initData.maxHeight - height;
				}
				break;
		}
		if (top < 0) top = 0;
		if (left < 0) left = 0;
		if (width + left > initData.maxWidth) {
			width = initData.maxWidth - left;
		}
		if (height + top > initData.maxHeight) {
			height = initData.maxHeight - top;
		}
		page.current.mouseInfo = {
			...page.current.mouseInfo,
			top,
			left,
			width,
			height,
			mouseMove: true,
		};
		setLayout((layout) => {
			const newLayout = [
				...layout.slice(0, index),
				{
					...layout[index],
					position: { ...layout[index].position, x: left, y: top, w: width, h: height },
				},
				...layout.slice(index + 1, layout.length),
			];
			return newLayout;
		});
	};

	const up = () => {
		console.log('up', page.current);
		if (
			!page.current ||
			!page.current.mouseInfo ||
			!page.current.mouseInfo.mouseDown ||
			!page.current.mouseInfo.mouseMove ||
			page.current.mouseInfo.type === 'bottomWechat'
		) {
			page.current = {};
			return;
		}
		const { top, left, width, height, id } = page.current.mouseInfo;
		dispatch({
			type: 'layoutData/update',
			payload: {
				id: page.current.mouseInfo.id,
				position: {
					x: left,
					y: top,
					w: width,
					h: height,
					i: id,
				}
			},
		});
		page.current = {};
	};

	useEffect(() => {
		document.addEventListener('mousemove', e => {
			move(e)
		});
		document.addEventListener('mouseup', up);
	}, []);

	const removeItem = (id: string) => {
		console.log(id, layout, freedomLayout, 'iiiiiii');
		dispatch({
			type: 'layoutData/remove',
			payload: {
				id
			},
		});
	};

	const blur = (e: Event) => {
		console.log('blurblurblurblurblur');
		const target = e.target as HTMLElement;
		let val = target.innerHTML.replace(/\n/g, '<br/>');
		const config = {
			text: val,
		};
		dispatch({
			type: 'layoutData/setting',
			payload: {
				config,
			},
		});
	};

	const showPopup = () => {
		console.log('setWechatPopup')
		dispatch({
			type: 'pageData/setWechatPopup',
			payload: {
				wechatPopup: !wechatPopup
			},
		});
	}

	return (
		<FreedomDragBox
			ref={page as React.RefObject<HTMLDivElement>}
			onDrop={e => {
				onDrop({ e, dispatch });
			}}
			onDragOver={e => {
				e.preventDefault();
			}}
			className={`FreedomDragBox ${layoutType == 'freedom' ? 'active' : ''}`}
			style={{ height: pageHeight }}
		>

			{layout.map((item, index) => (
				<DragDiv
					className={item.id == current?.id ? 'active drag' : 'drag'}
					style={{
						position: 'absolute',
						left: item.position.x,
						top: item.config.type === 'bottomWechat' ? 'initial' : (item.config.fixed == 'bottom' ? 'initial' : item.position.y),
						width: item.position.w,
						height: item.position.h,
						bottom: item.config.type === 'bottomWechat' ? 0 : (item.config.fixed == 'bottom' ? item.config.bottomY + 'px' : 'initial'),
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius as string) ? item.config.borderRadius + 'px' : item.config.borderRadius,
						overflow:item.config.borderRadius != '0'?'hidden':''
					} as React.CSSProperties}
					data-id={item.id}
					key={item.id}
					onMouseDown={(e: any) => {
						let className = e.target.className.replace(/(.*)point-/, '');
						if (item.config.fixed == 'bottom' && (className === 'bottom' || !className)) {
							return
						}
						down(e, index, item.config.type as string);
					}}
				>
					<EditorPoint className="point-top"></EditorPoint>
					<EditorPoint className="point-top-right"></EditorPoint>
					<EditorPoint className="point-right"></EditorPoint>
					<EditorPoint className="point-bottom-right"></EditorPoint>
					<EditorPoint className="point-bottom"></EditorPoint>
					<EditorPoint className="point-bottom-left"></EditorPoint>
					<EditorPoint className="point-left"></EditorPoint>
					<EditorPoint className="point-top-left"></EditorPoint>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					{generateFreedomDOM({ config: item.config, blur, type: 'freedom', showPopup, id: item.id })}
				</DragDiv>
			))
			}
		</FreedomDragBox>
	);
};

export default Drag;