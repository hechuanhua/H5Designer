import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import RGL, { WidthProvider } from 'react-grid-layout';
import Chat from '../../components/library/Chat';
import { generateFlowDOM } from '../../components/drag/generateDom';
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

	const generateFreedomDOM = (item, index) => {
		if (!item) return null;
		if (item.type == 'img') {
			return <img src={item.url} alt="" />;
		} else if (item.type == 'text') {
			return <>{item.text}</>;
		} else if (item.type == 'radio') {
			return (
				<div className="preview radio">
					<Mt10>{item.title}</Mt10>
					<div>
						{item.list.map((v, i) => (
							<Label style={{ width: `${100 / item.layoutType}%` }} key={i}>
								<input type="radio" name={`label${item.id}`} id={`label${item.id}`} />
								<span>{v.label}</span>
							</Label>
						))}
					</div>
				</div>
			);
		} else if (item.type == 'chat') {
			return (
				<div>
					<Chat></Chat>
				</div>
			);
		}
	};
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
						top: item.position.y,
						width: item.position.w,
						height: item.position.h,
					}}
					data-id={item.position.i}
					key={item.position.i}
				>
					{generateFreedomDOM(item.config, index)}
				</DragDiv>
			))}
		</PageDiv>
	);
};

export default Preview;
