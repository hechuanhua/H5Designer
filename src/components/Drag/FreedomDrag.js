import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { throttle, createUuid } from '../../utils';
import { generateFreedomDOM, onDrop } from './generateDom';
import initData from '../../config/initData';
import BottomWechat from '../Library/BottomWechat';
import RemoveIcon from '../Library/RemoveIcon';

const PageDiv = styled.div`
	width: ${initData.maxWidth}px;
	margin: 0 auto;
	border: 1px solid #ddd;
	min-height:  ${initData.height}px;
	position: absolute;
	top: 0;
	left: 0;
	pointer-events: none;
	&.free {
		pointer-events: auto;
		z-index: 20;
	}
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
	user-select: none;
	div[class*="point-"],.iconfont{
		display:none;
	}
	&.active{
		border: 1px solid #000;
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

const Drag = props => {
	const dispatch = useDispatch();
	const { freedomLayout, current, layoutType } = useSelector(state => {
		return state.layoutData;
	});
	const { pageHeight, wechatPopup } = useSelector(state => {
		return state.pageData;
	});
	const page = useRef();

	const [layout, setLayout] = useState([]);
	console.log(freedomLayout,'freedomLayoutfreedomLayout')
	useEffect(() => {
		setLayout(freedomLayout);
	}, [freedomLayout]);

	const queryParent = target => {
		if (target.className.indexOf('drag') > -1) {
			return target;
		} else {
			target = target.parentElement;
			return queryParent(target);
		}
	};

	const down = (e, index, type) => {
		let className = e.target.className.replace(/(.*)point-/, '');
		let target = queryParent(e.target);
		let id = target.getAttribute('data-id');
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
	const move = e => {
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
		setLayout(layout => {
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
			!page.current.mouseInfo ||
			!page.current.mouseInfo.mouseDown ||
			!page.current.mouseInfo.mouseMove ||
			page.current.mouseInfo.type === 'bottomWechat'
		) {
			page.current.mouseInfo = null;
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
				},
				type: 'freedom',
			},
		});
		page.current.mouseInfo = null;
	};

	useEffect(() => {
		document.addEventListener('mousemove', e => {
			throttle(() => {
				move(e);
			}, 300)();
		});
		document.addEventListener('mouseup', up);
	}, []);

	const removeItem = id => {
		console.log(id, layout, freedomLayout, 'iiiiiii');
		dispatch({
			type: 'layoutData/remove',
			payload: {
				id,
				type: 'freedom',
			},
		});
	};

	const blur = e => {
		console.log('blurblurblurblurblur');
		let val = e.target.innerHTML.replace(/\n/g, '<br/>');
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
				wechatPopup:!wechatPopup
			},
		});
	}

	return (
		<PageDiv
			ref={page}
			onDrop={e => {
				onDrop(e, 'freedom', dispatch);
			}}
			onDragOver={e => {
				e.preventDefault();
			}}
			className={layoutType == 'freedom' ? 'free' : ''}
			style={{height:pageHeight}}
		>
			
			{ layout.map((item, index) => (
				<DragDiv
					className={item.id == current.id ? 'active drag' : 'drag'}
					style={{
						position: 'absolute',
						left: item.position.x,
						top: item.config.type === 'bottomWechat'?'initial':(item.config.fixed == 'bottom' ? 'initial' : item.position.y),
						width: item.position.w,
						height: item.position.h,
						bottom: item.config.type === 'bottomWechat'?0:(item.config.fixed == 'bottom' ? item.config.bottomY + 'px' : 'initial'),
						color: item.config.color,
						fontSize: item.config.fontSize + 'px',
						backgroundColor: item.config.backgroundColor,
						textAlign: item.config.align,
						borderRadius: /^\d+$/.test(item.config.borderRadius)? item.config.borderRadius + 'px':item.config.borderRadius,
					}}
					data-id={item.id}
					key={item.id}
					onMouseDown={e => {
						let className = e.target.className.replace(/(.*)point-/, '');
						// if(item.config.type === 'bottomWechat'){
						// 	return
						// }
						if (item.config.fixed == 'bottom' && (className === 'bottom' || !className)) {
							return;
						}
						down(e, index, item.config.type);
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
					{generateFreedomDOM({config:item.config, index, blur, showPopup})}
				</DragDiv>
			))
			}
		</PageDiv>
	);
};

export default Drag;
