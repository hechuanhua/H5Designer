import React, { DragEvent, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import GridLayout, { ItemCallback } from 'react-grid-layout';
import ReactGridLayout from 'react-grid-layout';
import FreedomDrag from './FreedomDrag';
import { GenerateFlowDOM, onDrop } from 'lib/Draggable';
import initData from 'config/initData';

import { Layout } from 'typings/LayoutData'

const DraggableBox = styled.div.attrs(props => ({
	id: 'canvas',
}))`
	width: ${initData.maxWidth}px;
	margin: 0 auto;
	min-height: ${initData.height}px;
	position: relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	background:#EEE;
	&.print{
		>div:not(.active){
			background:#EEE!important;
		}
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

const Drag = () => {
	const dispatch = useDispatch();
	const { flowLayout, current, layoutType } = useSelector((state: any) => {
		return state.layoutData;
	});
	const { print, wechatPopup } = useSelector((state: any) => {
		return state.pageData;
	});
	const [layout, setLayout] = useState([])
	const box = useRef<HTMLDivElement>()

	useEffect(() => {
		setTimeout(() => {
			if (box && box.current) {
				const pageHeight = (box.current as any).containerHeight()
				dispatch({
					type: 'pageData/updateHeight',
					payload: {
						pageHeight
					},
				});
			}
		}, 0)
	}, [flowLayout.length]);

	useEffect(() => {
		setLayout(flowLayout.map((item: Layout) => item.position))
	}, [flowLayout]);

	const onDragStart: ItemCallback = (layouts, oldItem, newItem, placeholder, e, element) => {
		const id = element.getAttribute('data-id') as string;
		console.log(layouts, oldItem, newItem, placeholder, e, element,id,3333)
		dispatch({
			type: 'layoutData/setActive',
			payload: {
				id,
			},
		});
	};

	const onDragStop: ItemCallback = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('拖动完成时调用。', layouts, oldItem, newItem, placeholder, e, element);
		const id = element.getAttribute('data-id') as string;
		const position = {
			x: newItem.x,
			y: newItem.y,
		};
		dispatch({
			type: 'layoutData/update',
			payload: {
				id,
				position
			},
		});
	};

	const onResizeStop: ItemCallback = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('重置大小完成时调用。', layouts, oldItem, newItem, placeholder, e, element);
		const id = element.getAttribute('data-id') as string;
		const position = {
			x: newItem.x,
			y: newItem.y,
			w: newItem.w,
			h: newItem.h
		};
		dispatch({
			type: 'layoutData/update',
			payload: {
				id,
				position
			},
		});
	};

	const removeItem = (id: string) => {
		dispatch({
			type: 'layoutData/remove',
			payload: {
				id,
				type: 'flow',
			},
		});
	};

	const blur = (e: Event) => {
		const target = e.target as HTMLElement;
		if (!target) return
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
		dispatch({
			type: 'pageData/setWechatPopup',
			payload: {
				wechatPopup: !wechatPopup
			},
		});
	}

	return (
		<DraggableBox className={print ? 'print' : ''}>
			<FreedomDrag></FreedomDrag>
			<GridLayout
				style={{ minHeight: initData.height }}
				className={layoutType == 'flow' ? 'active' : ''}
				layout={layout} //
				cols={375}
				rowHeight={1}
				width={initData.maxWidth}
				autoSize={true} //容器高度自适应
				compactType={'vertical'}
				containerPadding={[0, 0]} //整个容器边距
				isBounded={true} //只能在父级内移动
				isDroppable={true} //如果为true，则可以将可放置元素（具有`draggable = {true}`属性）//放置在网格上。它使用位置和事件对象作为参数触发// “ onDrop”回调。//对于将元素放在特定位置很有用
				resizeHandles={['s', 'e']} //句柄位置
				margin={[0, 0]} //每个子项目边距
				useCSSTransforms={false} //css3替换top left，提高性能
				onDrop={(layout, item, e) => {
					onDrop({ e, dispatch });
				}} //data参数（ layout, oldItem, newItem, placeholder, e, element）
				onDragStart={onDragStart}
				onDragStop={onDragStop}
				onResizeStop={onResizeStop}
				ref={box as any}   //Ref获取网格包装div的参考  //已删除？
			>
				{GenerateFlowDOM({ flowLayout, current, blur, removeItem, showPopup })}
			</GridLayout>
		</DraggableBox>
	);
};

export default Drag;


