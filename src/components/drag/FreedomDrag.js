import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';
import { throttle, createUuid } from '../../utils';
import Chat from '../library/Chat';
import { generateFreedomDOM, onDrop } from './generateDom';

const PageDiv = styled.div`
	width: 500px;
	margin: 0 auto;
	border: 1px solid #ddd;
	height: 700px;
	position: absolute;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
	border: 1px solid #000;
	cursor: move;
	user-select: none;
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
const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
`;
const Icon = styled.div.attrs(props => ({
	className: 'iconfont',
}))`
	font-size: 15px;
	position: absolute;
	top: 2px;
	right: 2px;
	font-size: 15px;
	cursor: pointer;
	z-index: 30;
`;
const EditText = styled.div`
	padding: 5px;
	line-height: 1.5;
`;
const Drag = props => {
	const dispatch = useDispatch();
	const { freedomLayout, current, layoutType, popup } = useSelector(state => {
		return state.setLibrary;
	});
	const page = useRef();
	let maxWidth = 500,
		maxHeight = 700;

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

	const down = (e, index) => {
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
		};
		console.log('down', JSON.parse(JSON.stringify(page.current.mouseInfo)), id);
		setTimeout(() => {
			dispatch({
				type: 'setLibrary/setActive',
				payload: {
					id,
				},
			});
		}, 0);
	};
	const move = e => {
		if (!page.current || !page.current.mouseInfo || !page.current.mouseInfo.mouseDown) return;
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
				if (width + left > maxWidth) {
					left = maxWidth - width;
				}
				if (height + top > maxHeight) {
					top = maxHeight - height;
				}
				break;
		}
		if (top < 0) top = 0;
		if (left < 0) left = 0;
		if (width + left > maxWidth) {
			width = maxWidth - left;
		}
		if (height + top > maxHeight) {
			height = maxHeight - top;
		}
		page.current.mouseInfo = {
			...page.current.mouseInfo,
			top,
			left,
			width,
			height,
			mouseMove: true,
		};
		// setLayout(layout => {
		// 	const newLayout = [
		// 		...layout.slice(0, index),
		// 		{ ...layout[index], x: left, y: top, w: width, h: height },
		// 		...layout.slice(index + 1, layout.length),
		// 	];
		// 	return newLayout;
		// });
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
			!page.current.mouseInfo.mouseMove
		) {
			page.current.mouseInfo = null;
			return;
		}
		const { top, left, width, height, id } = page.current.mouseInfo;
		dispatch({
			type: 'setLibrary/update',
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
			type: 'setLibrary/remove',
			payload: {
				id,
				type: 'freedom',
			},
		});
	};

	const blur = e => {
		console.log('blurblurblurblurblur');
		let val = e.target.innerText.replace(/\n/g, '<br/>');
		const config = {
			text: val,
		};
		dispatch({
			type: 'setLibrary/setting',
			payload: {
				config,
			},
		});
	};
	const setPopup = () => {
		console.log('setPopup')
		dispatch({
			type: 'setLibrary/setPopup',
			payload: {
				popup:!popup
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
		>
			
			{layout.length
				? layout.map((item, index) => (
						<DragDiv
							className={item.id == current.id ? 'active drag' : 'drag'}
							style={{
								position: 'absolute',
								left: item.position.x,
								top: item.config.fixed == 'bottom' ? 'initial' : item.position.y,
								width: item.position.w,
								height: item.position.h,
								bottom: item.config.fixed == 'bottom' ? item.config.bottomY + 'px' : 'initial',
								color: item.config.color,
								fontSize: item.config.fontSize + 'px',
								backgroundColor: item.config.backgroundColor,
								textAlign: item.config.align,
								borderRadius: item.config.borderRadius + 'px',
							}}
							data-id={item.id}
							key={item.id}
							onMouseDown={e => {
								let className = e.target.className.replace(/(.*)point-/, '');
								if (item.config.fixed == 'bottom' && (className === 'bottom' || !className)) {
									return;
								}
								down(e, index);
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
							<Icon
								onClick={() => {
									removeItem(item.id);
								}}
							>
								&#xe60a;
							</Icon>
							{generateFreedomDOM({config:item.config, index, blur, setPopup})}
						</DragDiv>
				  ))
				: ''}
		</PageDiv>
	);
};

export default Drag;
