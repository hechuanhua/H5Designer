import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import RGL, { WidthProvider } from 'react-grid-layout';
import { generateFlowDOM, generateFreedomDOM } from '../../components/drag/generateDom';
import WechatPopup from '../../components/library/WechatPopup'
import initData from '../../config/initData';
import { createGlobalStyle } from 'styled-components'
const ReactGridLayout = WidthProvider(RGL);

const Globalstyle = createGlobalStyle`　
	body,html{
　　width:${initData.maxWidth}px;
		margin:0 auto;
	}`;

const PageDiv = styled.div.attrs(props => ({
	className: 'preview',
}))`
	width: 100%;
	margin: 0 auto;
	height: 800px;
	position: relative;
	max-width: ${initData.maxWidth}px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
`;

const Preview = props => {
	const [layout, setLayout] = useState([]);
	const dispatch = useDispatch();
	const { flowLayout, freedomLayout, current, popup } = useSelector(state => {
		return state.layoutData;
	});
	
	let clientWidth = document.documentElement.clientWidth;
	useEffect(() => {
		let scale = 1
		if (initData.maxWidth > clientWidth) {
			scale = clientWidth/initData.maxWidth
		} else {
			scale =  clientWidth/initData.maxWidth ;
		}
		console.log(scale,initData.maxWidth,'scale')
		document.getElementById('viewport').setAttribute('content',`width=375, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`) 
		const layouts = flowLayout.map(item => item.position);
		setLayout(layouts);
	}, [flowLayout]);

	const setPopup = () => {
		console.log('setPopup',popup)
		dispatch({
			type: 'layoutData/setPopup',
			payload: {
				popup:!popup
			},
		});
	}
	return (
		<PageDiv>
			<Globalstyle></Globalstyle>
			<ReactGridLayout
				layout={layout}
				isDraggable={false}
				isResizable={false}
				cols={50}
				rowHeight={1}
				width={initData.maxWidth}
				compactType={'vertical'}
				containerPadding={[0, 0]} //整个容器边距
				margin={[0, 0]} //每个子项目边距
			>
				{generateFlowDOM(flowLayout)}
			</ReactGridLayout>
      <WechatPopup visibility={popup} setPopup={setPopup}></WechatPopup>
			{freedomLayout.map((item, index) => (
				<DragDiv
					className={item.position.i == current.id ? 'active drag' : 'drag'}
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
					}}
					data-id={item.position.i}
					key={item.position.i}
				>
					{generateFreedomDOM({ config: item.config, type: 'preview', setPopup })}
				</DragDiv>
			))}
		</PageDiv>
	);
};

export default Preview;


