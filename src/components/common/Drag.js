import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { throttle } from '../../utils/index';
import _ from 'lodash';
const PageDiv = styled.div`
	width: 500px;
	margin: 0 auto;
	border: 1px solid #ddd;
	height: 800px;
	position: relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
const Drag = () => {
	const { dispatch } = useDispatch();
	const page = useRef();
	let left = 0,
		top = 0,
		width = 200,
		height = 100;
	let maxWidth = 500;
	let maxHeight = 700;
	const styleDefault = {
		position: 'absolute',
		top,
		left,
		width,
		height,
	};
	const [style, setStyle] = useState([{ ...styleDefault }, { ...styleDefault }]);
	const down = (e, index) => {
		let className = e.target.className.replace(/(.*)point-/, '');
		let target = e.target;
		if (target.className.indexOf('drag') == -1) {
			target = target.parentElement;
		}
		page.current.mouseInfo = {
			mouseUp: true,
			startX: e.pageX,
			startY: e.pageY,
			oldLeft: parseInt(target.style.left),
			oldTop: parseInt(target.style.top),
			oldWidth: parseInt(target.style.width),
			oldHeight: parseInt(target.style.height),
			className: className,
			index,
		};
	};
	const move = e => {
		if (!page.current || !page.current.mouseInfo || !page.current.mouseInfo.mouseUp) return;
		e.stopPropagation();
		e.preventDefault();
		const { oldWidth, oldHeight, oldTop, oldLeft, index, className, startX, startY } = page.current.mouseInfo;
		let moveX = e.pageX - startX;
		let moveY = e.pageY - startY;
		switch (className) {
			case 'top':
				height = oldHeight - moveY;
				top = oldTop + moveY;
				break;
			case 'right':
				width = moveX + oldWidth;
				break;
			case 'bottom':
				height = moveY + oldHeight;
				break;
			case 'left':
				width = oldWidth - moveX;
				left = oldLeft + moveX;
				break;
			case 'top-right':
				height = oldHeight - moveY;
				width = moveX + oldWidth;
				top = oldTop + moveY;
				break;
			case 'bottom-right':
				height = moveY + oldHeight;
				width = moveX + oldWidth;
				break;
			case 'bottom-left':
				height = moveY + oldHeight;
				width = oldWidth - moveX;
				left = oldLeft + moveX;
				break;
			case 'top-left':
				height = oldHeight - moveY;
				top = oldTop + moveY;
				width = oldWidth - moveX;
				left = oldLeft + moveX;
				break;

			default:
				left = Number(oldLeft) + moveX;
				top = Number(oldTop) + moveY;
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
		setStyle(style => {
			return [
				...style.slice(0, index),
				{ ...style[index], top, left, width, height },
				...style.slice(index + 1, style.length),
			];
		});
	};

	const up = () => {
		console.log('up');
		if (page.current.mouseInfo) {
			page.current.mouseInfo = null;
		}
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
		const x = e.pageX;
		const y = e.pageY;
	};
	const a = [1, 2];
	return (
		<PageDiv
			ref={page}
			onDrop={onDrop}
			onDragOver={e => {
				e.preventDefault();
			}}
		>
			{a.map((item, index) => (
				<DragDiv
					className="drag"
					style={style[index]}
					key={index}
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
				</DragDiv>
			))}
		</PageDiv>
	);
};

export default Drag;
