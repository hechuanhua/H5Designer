import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import GridLayout from 'react-grid-layout';
import { createUuid } from '../../utils/index';
import initData from '../../config/initData';
import CommonDrag from '../common/Drag'


const PageDiv = styled.div`
	width: 500px;
	margin: 0 auto;
	height: 800px;
  position:relative;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
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
	const [layout, setLayout] = useState([]);
  const {free} = props
	const { layoutData, current } = useSelector(state => {
		return state.setLibrary;
	});
	//{"i":"x-0","x":0,"y":0,"w":1,"h":119,"isBounded":true}
	useEffect(() => {
		console.log(layoutData, 'layoutData useEffect');
		const layouts = layoutData.map(item => item.position);
		setLayout(layouts);
	}, [layoutData]);

	const onDrop = (layout, item, e) => {
		// console.log('当元素从外部放入网格中时调用', layout, item, e)
		const type = e.dataTransfer.getData('text');
		console.log(type, '类型');
		const id = createUuid(6);
		const position = {
			x: item.x,
			y: item.y,
			w: initData[type].w,
			h: initData[type].h,
			i: id,
		};
		const payload = {
			id,
			position,
			config: initData[type].config,
      type:'flow'
		};
		dispatch({
			type: 'setLibrary/add',
			payload: payload,
		});
	};

	const onDragStart = (layouts, oldItem, newItem, placeholder, e, element) => {
		console.log('拖动开始时调用', layouts, oldItem, newItem, placeholder, e, element);
		if (/^\d+$/.test(newItem.i)) {
			dispatch({
				type: 'setLibrary/setActive',
				payload: {
					id: newItem.i,
          type:'flow',
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
        type:'flow'
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
        type:'flow'
			},
		});
	};

  const removeItem = (id) => {
    dispatch({
			type: 'setLibrary/remove',
			payload: {
				id,
        type:'flow'
			},
		});
  }

	const generateDOM = () => {
		return layoutData.map((item, index) => {
			if (item.config.type == 'img') {
				return (
					<div
						key={item.id}
						data-grid={item.position}
						className={item.id === current.id ? 'active' : ''}
					>
            
            <Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
						<img src={item.config.url} alt="" />
					</div>
				);
			} else if (item.config.type == 'text') {
				return (
					<div
						key={item.id}
						data-grid={item.position}
						className={item.id === current.id ? 'active' : ''}
					>
            <Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
						{item.config.text}
					</div>
				);
			} else if (item.config.type == 'radio') {
				return (
					<div
						key={item.id}
						data-grid={item.position}
						className={item.id === current.id ? 'active' : ''}
					>
            <Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
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
					</div>
				);
			}
		});
	};

	return (
		<PageDiv>
      <CommonDrag free={free}></CommonDrag>
			<GridLayout
				style={{ minHeight: 700 }}
				className="layout"
				layout={layout} //
				cols={50}
				rowHeight={1}
				width={500}
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
				onDrop={onDrop} //data参数（ layout, oldItem, newItem, placeholder, e, element）
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
				{generateDOM()}
			</GridLayout>
		</PageDiv>
	);
};

export default Drag;
