import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';
import { throttle, createUuid } from '../../utils';

const PageDiv = styled.div`
	width: 500px;
	margin: 0 auto;
	border: 1px solid #ddd;
	height: 700px;
	position: absolute;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	top:0;
	left:0;
	pointer-events: none;
	&.free{
		pointer-events: auto;
		z-index:20;
	}
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	border: 1px solid #000;
	cursor: move;
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
	className: 'iconfont'
}))`
  font-size:15px;
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  cursor: pointer;
  z-index: 30;
`
const Drag = (props) => {
	const dispatch = useDispatch();
	const { free } = props
	const { newLayoutData, current } = useSelector(state => {
		return state.setLibrary;
	});
	console.log(free, current, 'free')
	const page = useRef();
	let maxWidth = 500,
		maxHeight = 700;

	const [layout, setLayout] = useState([]);

	useEffect(() => {
		const layout = newLayoutData.map(item => item.position);
		setLayout(layout);
		console.log(newLayoutData, layout, 'newLayoutData useEffect')
	}, [newLayoutData]);

	const queryParent = (target) => {
		if (target.className.indexOf('drag')>-1){
			return target
		}else{
			target = target.parentElement
			return queryParent(target)
		}
	}

	const down = (e, index) => {
		let className = e.target.className.replace(/(.*)point-/, '');
		let target = queryParent(e.target)
		let id = target.getAttribute('data-id');
		page.current.mouseInfo = {
			mouseDown: true,
			mouseMove: false,
			startX: e.pageX,
			startY: e.pageY,
			styleLeft: parseInt(target.style.left),
			styleTop: parseInt(target.style.top),
			styleWidth: parseInt(target.style.width),
			styleHeight: parseInt(target.style.height),
			className: className,
			index,
			id,
		};
		console.log('down', JSON.parse(JSON.stringify(page.current.mouseInfo)), id);
		dispatch({
			type: 'setLibrary/setActive',
			payload: {
				id,
			},
		});
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
		setLayout(layout => {
			const newLayout = [
				...layout.slice(0, index),
				{ ...layout[index], x: left, y: top, w: width, h: height },
				...layout.slice(index + 1, layout.length),
			];
			return newLayout;
		});
	};

	const up = () => {
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

	const onDrop = e => {
		const type = e.dataTransfer.getData('text');
		const x = e.pageX - 470 || page.current.offsetLeft;
		const y = e.pageY - 36 || page.current.offsetTop;
		// const x = e.pageX
		// const y = e.pageY
		const id = createUuid(6);
		const position = {
			x,
			y,
			w: initData[type].w * 10,
			h: initData[type].h,
			i: id,
		};
		dispatch({
			type: 'setLibrary/add',
			payload: {
				id,
				position,
				config: initData[type].config,
				type: 'freedom',
			},
		});
	};

	const removeItem = (id) => {
		console.log(id, layout, newLayoutData, 'iiiiiii')
		dispatch({
			type: 'setLibrary/remove',
			payload: {
				id,
				type: 'freedom',
			},
		});
	}

	const generateDOM = (item, index) => {
		if(!item)return null
		if (item.config.type == 'img') {
			return (
				<img src={item.config.url} alt="" />
			);
		} else if (item.config.type == 'text') {
			return (
				<>
					{item.config.text}
				</>
			);
		} else if (item.config.type == 'radio') {
			return (
				<div className="preview radio">
					<Mt10>{item.config.title}</Mt10>
					<div>
						{item.config.list.map((v, i) => (
							<Label style={{ width: `${100 / item.config.layoutType}%` }} key={i}>
								<input type="radio" name={`label${item.id}`} id={`label${item.id}`} />
								<span>{v.label}</span>
							</Label>
						))}
					</div>
				</div>
			);
		}
	};

	return (
		<PageDiv
			ref={page}
			onDrop={onDrop}
			onDragOver={e => {
				e.preventDefault();
			}}
			className={free ? 'free' : ''}
		>
			{
				console.log(layout, newLayoutData, 'newLayoutDatanewLayoutDatanewLayoutData')
			}
			{layout.map((item, index) => (
				<DragDiv
					className={item.i == current.id ? 'active drag' : 'drag'}
					style={{
						position: 'absolute',
						left: item.x,
						top: item.y,
						width: item.w,
						height: item.h,
					}}
					data-id={item.i}
					key={item.i}
					onMouseDown={e => {
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
					<Icon onClick={() => { removeItem(item.i) }}>&#xe60a;</Icon>
					{generateDOM(newLayoutData[index], index)}
				</DragDiv>
			))}
		</PageDiv>
	);
};

export default Drag;
