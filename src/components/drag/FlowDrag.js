import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import CommonDrag from '../drag/FreedomDrag';
import { generateFlowDOM, onDrop } from './generateDom';
import initData from '../../config/initData';

const PageDiv = styled.div.attrs(props => ({
	id: 'canvas',
}))`
	width: ${initData.maxWidth}px;
	margin: 0 auto;
	height: ${initData.height}px;
	position: relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	&.print{
		.active{
			border:none;
			div[class*='point-']{
				display:none;
			}
			.iconfont{
				display:none;
			}
		}
	}
`;

const Drag = props => {
	const dispatch = useDispatch();
	const [layout, setLayout] = useState([]);
	const { layoutData, current } = useSelector(state => {
		return state.setLibrary;
	});
	useEffect(() => {
		const layouts = layoutData.map(item => item.position);
		setLayout(layouts);
	}, [layoutData]);

	const onDragStart = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('拖动开始时调用', layouts, oldItem, newItem, placeholder, e, element);
		if (/^\d+$/.test(newItem.i)) {
			dispatch({
				type: 'setLibrary/setActive',
				payload: {
					id: newItem.i,
					type: 'flow',
				},
			});
		}
	};
	const onDragStop = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('拖动完成时调用。', layouts, oldItem, newItem, placeholder, e, element);
		const position = {
			x: newItem.x,
			y: newItem.y,
			// w:newItem.w,
			// h:newItem.h,
			i: newItem.i,
		};
		dispatch({
			type: 'setLibrary/update',
			payload: {
				id: newItem.i,
				position,
				type: 'flow',
			},
		});
	};

	const onResizeStop = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('跳转大小完成时调用。', layouts, oldItem, newItem, placeholder, e, element);
		const position = {
			x: newItem.x,
			y: newItem.y,
			w: newItem.w,
			h: newItem.h,
			i: newItem.i,
		};
		dispatch({
			type: 'setLibrary/update',
			payload: {
				id: newItem.i,
				position,
				type: 'flow',
			},
		});
	};

	const removeItem = id => {
		dispatch({
			type: 'setLibrary/remove',
			payload: {
				id,
				type: 'flow',
			},
		});
	};

	return (
		<PageDiv>
			<CommonDrag></CommonDrag>
			<GridLayout
				style={{ minHeight: initData.height }}
				className="layout"
				layout={layout} //
				cols={50}
				rowHeight={1}
				width={initData.maxWidth}
				autoSize={true} //容器高度自适应
				compactType={'vertical'}
				draggableCancel="" //不可拖动的class  .test
				draggableHandle="" //用于标记的CSS选择器，它将用作可拖动的句柄
				containerPadding={[0, 0]} //整个容器边距
				isDroppable={true} //如果为true，则可以将可放置元素（具有`draggable = {true}`属性）//放置在网格上。它使用位置和事件对象作为参数触发// “ onDrop”回调。//对于将元素放在特定位置很有用
				isDraggable={true} //是否可拖动
				isResizable={true} //是否可调整大小
				isBounded={true} //只能在父级内移动
				resizeHandles={['s', 'e']} //句柄位置
				margin={[0, 0]} //每个子项目边距
				CSSTransforms={false} //css3替换top left，提高性能
				// transformScale={1}  //拖动速度比例
				preventCollision={false} //拖动后不会调换位置
				onDrop={(layout, item, e) => {
					onDrop(e, 'flow', dispatch);
				}} //data参数（ layout, oldItem, newItem, placeholder, e, element）
				onLayoutChange={data => {
					console.log('回调，因此您可以保存布局', data);
				}}
				onDropDragOver={data => {
					console.log('当元素从外部从上方拖到网格上方时调用', data);
				}}
				onDragStart={onDragStart}
				onDragStop={onDragStop}
				onResizeStart={data => {
					console.log('调整大小开始时调用', data);
				}}
				onResize={data => {
					console.log('发生尺寸调整移动时调用', data);
				}}
				onResizeStop={onResizeStop}
				//innerRef={}  //Ref获取网格包装div的参考  //已删除？
			>
				{generateFlowDOM(layoutData, current, removeItem)}
			</GridLayout>
		</PageDiv>
	);
};

export default Drag;
