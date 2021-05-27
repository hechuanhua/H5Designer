import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GridLayout from 'react-grid-layout';
import { createUuid } from '../../utils/index'
// import Draggable, {DraggableCore} from 'react-draggable';
// import {Rnd} from 'react-rnd';


const json = {
  img: {
    w: 50,
    h: 238,
    config:{
      type:'img',
      url:'https://dummyimage.com/500x240'
    }
  },
  text: {
    w: 50,
    h: 40,
    config:{
      type:'text',
      text:'我是测试文字'
    }
  },
  radio:{
    w:50,
    h:150,
    config:{
      type:'radio',
      title:'我是单选字段标题',
      list:['我是字段1','我是字段2','我是字段3','我是字段4','我是字段5'],
      layoutType:'3'
    }
  }
}
const PageDiv = styled.div`
  width: 500px;
  margin: 0 auto;
  border: 1px solid #ddd;
  height: 800px;
  position: relative;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
`;
const Mt10 = styled.div`
  margin-top:10px
`
const Label = styled.label`
  display:inline-block;
  margin-top:10px;
`
const Drag = () => {
  const dispatch = useDispatch();
  // const a = "[{\"id\":\"266426\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":238,\"i\":\"266426\"},\"config\":{\"type\":\"img\",\"url\":\"\"}},{\"id\":\"970646\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":156.56565656565655,\"i\":\"970646\"},\"config\":{\"type\":\"img\",\"url\":\"https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png\"}},{\"id\":\"871656\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":156.56565656565655,\"i\":\"871656\"},\"config\":{\"type\":\"img\",\"url\":\"https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png\"}},{\"id\":\"129012\",\"position\":{\"x\":0,\"y\":238,\"w\":1,\"h\":238,\"i\":\"129012\"},\"config\":{\"type\":\"img\",\"url\":\"\"}}]"
  const [layout, setLayout] = useState([])

  const { layoutData, current } = useSelector(state => {
    return state.setLibrary
  })
  //{"i":"x-0","x":0,"y":0,"w":1,"h":119,"isBounded":true}
  useEffect(() => {
    const layouts = layoutData.map(item => (
      item.position
    ))
    setLayout(layouts)
  }, [layoutData])

  const onDrop = (layout, item, e) => {
    // console.log('当元素从外部放入网格中时调用', layout, item, e)
    const type = e.dataTransfer.getData('text')
    console.log(type, '类型')
    const id = createUuid(6)
    const position = {
      x:item.x,
      y:item.y,
      w:json[type].w, 
      h:json[type].h,
      i:id
    }
    const payload = {
      id,
      position,
      config:json[type].config
    }
    dispatch({
      type: "setLibrary/add",
      payload: payload
    });
  };

  const onDragStart = (layouts, oldItem, newItem, placeholder, e, element) => {
    console.log('拖动开始时调用', layouts, oldItem, newItem, placeholder, e, element)
    if ((/^\d+$/).test(newItem.i)) {
      dispatch({
        type: "setLibrary/setActive",
        payload: {
          id: newItem.i
        },
      });
    }
  }

  const generateDOM = () => {
    return layoutData.map((item, index) => {
      if (item.config.type == 'img') {
        return <div key={item.id} data-grid={item.position} className={item.id === current.id ? 'active' : ''}>
          <img src={item.config.url} alt="" />
        </div>
      } else if (item.config.type == 'text') {
        return <div key={item.id} data-grid={item.position} className={item.id === current.id ? 'active' : ''}>
          {item.config.text}
        </div>
      } else if (item.config.type == 'radio') {
        return <div key={item.id} data-grid={item.position} className={item.id === current.id ? 'active' : ''}>
          <div className="preview radio">
            <Mt10>{item.config.title}</Mt10>
            <div>
            {
              item.config.list.map((v,i)=>(
                <Label style={{width:`${100/item.config.layoutType}%`}} key={i}>
                  <input type="radio" name={`label${item.id}`} id={`label${item.id}`} />
                  <span>{v}</span>
                </Label>
              ))
            }
            </div>
          </div>
        </div>
      }
    })
  }
  
  return (
    <PageDiv>
      <GridLayout
        style={{ minHeight: 700 }}
        className="layout"
        layout={layout}  //
        cols={50}
        rowHeight={1}
        width={500}
        autoSize={true} //容器高度自适应
        compactType={'vertical'}
        draggableCancel='' //不可拖动的class  .test
        draggableHandle=''  //用于标记的CSS选择器，它将用作可拖动的句柄
        containerPadding={[0, 0]}  //整个容器边距
        isDroppable={true} //如果为true，则可以将可放置元素（具有`draggable = {true}`属性）//放置在网格上。它使用位置和事件对象作为参数触发// “ onDrop”回调。//对于将元素放在特定位置很有用
        isDraggable={true} //是否可拖动
        isResizable={true} //是否可调整大小
        isBounded={true} //只能在父级内移动
        resizeHandles={['s', 'e']} //句柄位置
        margin={[0, 0]}  //每个子项目边距
        CSSTransforms={false} //css3替换top left，提高性能
        // transformScale={1}  //拖动速度比例
        preventCollision={false} //拖动后不会调换位置
        onDrop={onDrop}  //data参数（ layout, oldItem, newItem, placeholder, e, element）
        onLayoutChange={(data) => { console.log('回调，因此您可以保存布局', data) }}
        onDropDragOver={data => { console.log('当元素从外部从上方拖到网格上方时调用', data) }}
        onDragStart={onDragStart}
        onDragStop={data => { console.log('拖动完成时调用。', data) }}
        onResizeStart={data => { console.log('调整大小开始时调用', data) }}
        onResize={data => { console.log('发生尺寸调整移动时调用', data) }}
        onResizeStop={data => { console.log('调整大小后调用', data) }}
      //innerRef={}  //Ref获取网格包装div的参考  //已删除？
      >

       {generateDOM()}
      </GridLayout>

    </PageDiv>
  );
};

export default Drag;
