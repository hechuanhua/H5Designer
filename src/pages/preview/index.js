import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import RGL, { WidthProvider } from 'react-grid-layout';
import { createUuid } from '../../utils/index';
import initData from '../../config/initData';
import CommonDrag from '../../components/common/Drag'

const ReactGridLayout = WidthProvider(RGL);

const PageDiv = styled.div.attrs(props => ({
  className: 'preview'
}))`
	width: 100%;
	margin: 0 auto;
	height: 800px;
  position:relative;
  max-width:500px;
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
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	border: 1px solid #000;
	cursor: move;
`;

const Preview = (props) => {
  const [layout, setLayout] = useState([]);
  const [freedomLayout, setFreedomLayout] = useState([]);

  const { layoutData, newLayoutData, current } = useSelector(state => {
    return state.setLibrary;
  });

  const w = document.documentElement.clientWidth
  const [clientWidth, setClientWidth] = useState(w)

  useEffect(() => {
    console.log(layoutData, 'layoutData useEffect');
    const layouts = layoutData.map(item => item.position);
    setLayout(layouts);
  }, [layoutData]);

  useEffect(() => {
		const freedomLayout = newLayoutData.map(item => item.position);
		setFreedomLayout(freedomLayout);
	}, [newLayoutData]);

  const generateDOM = () => {
    return layoutData.map((item, index) => {
      if (item.config.type == 'img') {
        return (
          <div
            key={item.id}
            data-grid={item.position}
            className={item.id === current.id ? 'active' : ''}
          >


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

  const generateFreedomDOM = (item, index) => {
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
    <PageDiv>
      <ReactGridLayout
        // className="layout"
        layout={layout} //
        isDraggable={false}
        isResizable={false}
        cols={50}
        rowHeight={1}
        width={clientWidth}
        // autoSize={true} //容器高度自适应
        compactType={'vertical'}
        containerPadding={[0, 0]} //整个容器边距
        margin={[0, 0]} //每个子项目边距
      >
        {generateDOM()}
      </ReactGridLayout>
      {freedomLayout.map((item, index) => (
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
          >
            {generateFreedomDOM(newLayoutData[index], index)}
          </DragDiv>
        ))}
    </PageDiv>
  );
};

export default Preview;
