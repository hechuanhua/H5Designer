import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GridLayout from 'react-grid-layout';
import { createUuid } from '../../utils/index'
// import Draggable, {DraggableCore} from 'react-draggable';
// import {Rnd} from 'react-rnd';

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
  // const a = "[{\"id\":\"266426\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":238,\"i\":\"266426\"},\"config\":{\"type\":\"img\",\"url\":\"\"}},{\"id\":\"970646\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":156.56565656565655,\"i\":\"970646\"},\"config\":{\"type\":\"img\",\"url\":\"https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png\"}},{\"id\":\"871656\",\"position\":{\"x\":0,\"y\":0,\"w\":1,\"h\":156.56565656565655,\"i\":\"871656\"},\"config\":{\"type\":\"img\",\"url\":\"https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png\"}},{\"id\":\"129012\",\"position\":{\"x\":0,\"y\":238,\"w\":1,\"h\":238,\"i\":\"129012\"},\"config\":{\"type\":\"img\",\"url\":\"\"}}]"
  const [layout,setLayout] = useState([]) 
  
  const {layoutData,current} = useSelector(state => {
    return state.setLibrary
  })
  //{"i":"x-0","x":0,"y":0,"w":1,"h":119,"isBounded":true}
  useEffect(()=>{
    const layouts = layoutData.map(item=>(
      item.position
    ))
    setLayout(layouts)
  },[layoutData])
  
  const onDrop = (layout, item,  e) => {
    console.log('当元素从外部放入网格中时调用',layout,item,e)
    console.log(e.dataTransfer.getData('text'),44444)
    const type = e.dataTransfer.getData('text')
    const id = createUuid(6)
    const position = {
      x:item.x,
      y:item.y,
      w:item.w, 
      h:238,
      i:id
    }
    dispatch({
      type: "setLibrary/add",
      payload: {
        id,
        position,
        type
      },
    });
  };

  const onDragStart = ( layouts, oldItem, newItem, placeholder, e, element) => {
    console.log('拖动开始时调用', layout,layouts, oldItem, newItem, placeholder, e, element)
    if((/^\d+$/).test(newItem.i)){
      dispatch({
        type: "setLibrary/setActive",
        payload: {
          id:newItem.i
        },
      });
    }
    
  }
  return (
    <PageDiv>
      {
        console.log(layoutData,layout,'layoutData')
      }
      <GridLayout 
        style={{minHeight:700}}
        className="layout" 
        layout={layout}  //
        cols={1} 
        rowHeight={1}
        width={500} 
        autoSize={true} //容器高度自适应
        compactType={'vertical'} 
        draggableCancel='' //不可拖动的class  .test
        draggableHandle=''  //用于标记的CSS选择器，它将用作可拖动的句柄
        containerPadding={[0,0]}  //整个容器边距
        isDroppable={true} //如果为true，则可以将可放置元素（具有`draggable = {true}`属性）//放置在网格上。它使用位置和事件对象作为参数触发// “ onDrop”回调。//对于将元素放在特定位置很有用
        isDraggable={true} //是否可拖动
        isResizable={true} //是否可调整大小
        isBounded ={true} //只能在父级内移动
        resizeHandles={['s']} //句柄位置
        margin={[0,0]}  //每个子项目边距
        CSSTransforms={false} //css3替换top left，提高性能
        // transformScale={1}  //拖动速度比例
        preventCollision={false} //拖动后不会调换位置
        onDrop={onDrop}  //data参数（ layout, oldItem, newItem, placeholder, e, element）
        onLayoutChange={(data)=>{console.log('回调，因此您可以保存布局',data)}}
        onDropDragOver={data=>{console.log('当元素从外部从上方拖到网格上方时调用',data)}}  
        onDragStart={onDragStart}
        onDragStop={data=>{console.log('拖动完成时调用。',data)}}
        onResizeStart={data=>{console.log('调整大小开始时调用',data)}}
        onResize={data=>{console.log('发生尺寸调整移动时调用',data)}}
        onResizeStop={data=>{console.log('调整大小后调用',data)}}
        //innerRef={}  //Ref获取网格包装div的参考  //已删除？
      >
        
        {
          layoutData.map((item,index)=>{
            console.log(item,'item')
            return <div key={item.id} data-grid={item.position} className={item.id === current.id?'active':''}>
             { <img src={item.config.url?item.config.url:'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'} alt=""/>}
            </div>
          })
        }
      </GridLayout>

    </PageDiv>
  );
};

export default Drag;
