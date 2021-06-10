import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import RGL, { WidthProvider } from 'react-grid-layout';
import { generateFlowDOM, generateFreedomDOM } from '../../components/drag/generateDom';
const ReactGridLayout = WidthProvider(RGL);

const PageDiv = styled.div.attrs(props => ({
	className: 'preview'
}))`
	width: 100%;
	margin: 0 auto;
	height: 800px;
	position: relative;
	max-width: 500px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
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
const Preview = props => {
	const [layout, setLayout] = useState([]);

	const { layoutData, freedomLayout, current } = useSelector(state => {
		return state.setLibrary;
	});
  let w = document.documentElement.clientWidth
  
	useEffect(() => {
    if(w>500){w = 500}
    const scale = w / 500
    freedomLayout.forEach((item,index)=>{
      item.position.x = item.position.x * scale
      item.position.y = item.position.y * scale
      item.position.w = item.position.w * scale
      item.position.h = item.position.h * scale
    })
		const layouts = layoutData.map(item => item.position);
		setLayout(layouts);
	}, [layoutData]);

	return (
		<PageDiv>
			<ReactGridLayout
				layout={layout}
				isDraggable={false}
				isResizable={false}
				cols={50}
				rowHeight={1}
				width={w}
				compactType={'vertical'}
				containerPadding={[0, 0]} //整个容器边距
				margin={[0, 0]} //每个子项目边距
			>
				{generateFlowDOM(layoutData)}
			</ReactGridLayout>
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
					{generateFreedomDOM(item.config, 'preview')}
				</DragDiv>
			))}
		</PageDiv>
	);
};

export default Preview;
