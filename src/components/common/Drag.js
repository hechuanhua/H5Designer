import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';
import { throttle, createUuid } from '../../utils';

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
	const dispatch = useDispatch();
	const { layoutData, current } = useSelector(state => {
		return state.setLibrary;
	});
	const page = useRef();
	const layoutDataRef = useRef()
	// const
	let left = 0,
		top = 0,
		width = 200,
		height = 100,
		maxWidth = 500,
		maxHeight = 700;

	const [layout, setLayout] = useState([]);
	console.log(JSON.parse(JSON.stringify(layoutData)), JSON.parse(JSON.stringify(current)), 'current');
	useEffect(() => {
		console.log(JSON.parse(JSON.stringify(layoutData)), 'pppppp');
		const layout = layoutData.map(item => item.position);
		setLayout(layout);
		layoutDataRef.current = {
			layoutData,
			current
		}
	}, [layoutData]);

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
		const { oldWidth, oldHeight, oldTop, oldLeft, index, className, startX, startY } =
			page.current.mouseInfo;
		let moveX = e.pageX - startX;
		let moveY = e.pageY - startY;
		top = oldTop
		left = oldLeft
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
		console.log(left,top,width,height,'heightheightheightheight')
		setLayout(layout => {
			const newLayout = [
				...layout.slice(0, index),
				{ ...layout[index], x: left, y: top, w: width, h: height },
				...layout.slice(index + 1, layout.length),
			];
			console.log(layout, newLayout, 'newLayout');
			return newLayout;
		});
	};

	const up = () => {
		console.log('up', page.current.mouseInfo,layoutDataRef.current,layout);
		// const ret = layoutDataRef.current.layoutData.filter(item => item.id === layoutDataRef.current.current.id)[0];
		const ret  = layout
		// current
		const position = {
			x: ret.x,
			y: ret.y,
			w: ret.w,
			h: ret.h,
			i: ret.i,
		};
		dispatch({
			type: 'setLibrary/update',
			payload: {
				id: layoutDataRef.current.current.id,
				position,
			},
		});
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
		const type = e.dataTransfer.getData('text');
		console.log('onDrop', e, type);

		const x = e.pageX - page.current.offsetLeft;
		const y = e.pageY - page.current.offsetTop;

		const id = createUuid(6);
		const position = {
			x,
			y,
			w: 200,
			h: 100,
			i: id,
		};
		const payload = {
			id,
			position,
			config: initData[type].config,
			type: 'freedom',
		};
		dispatch({
			type: 'setLibrary/add',
			payload: payload,
		});
	};

	return (
		<PageDiv
			ref={page}
			onDrop={onDrop}
			onDragOver={e => {
				e.preventDefault();
			}}
		>
			{console.log(layout, 111)}
			{layout.map((item, index) => (
				<DragDiv
					className="drag"
					style={{
						position: 'absolute',
						left: item.x,
						top: item.y,
						width: item.w,
						height: item.h,
					}}
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
