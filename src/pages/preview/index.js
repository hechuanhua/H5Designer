import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import RGL, { WidthProvider } from 'react-grid-layout';
import Chat from '../../components/library/Chat';
import { generateFlowDOM, generateFreedomDOM } from '../../components/drag/generateDom';
const ReactGridLayout = WidthProvider(RGL);

const PageDiv = styled.div.attrs(props => ({
	className: 'preview',
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

	useEffect(() => {
		const layouts = layoutData.map(item => item.position);
		setLayout(layouts);
	}, [layoutData]);

	return (
		<PageDiv>
			<ReactGridLayout
				// className="layout"
				layout={layout} //
				isDraggable={false}
				isResizable={false}
				cols={50}
				rowHeight={1}
				width={document.documentElement.clientWidth}
				// autoSize={true} //容器高度自适应
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
