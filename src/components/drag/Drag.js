import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import GridLayout from 'react-grid-layout';
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
const Drag1 = () => {
  const dispatch = useDispatch();
  const selected = useSelector(state => {
    return state.selected
  })
  console.log(selected, 'selected')
  const up = () => { };
  // const layout = [ 
  //   { i: 'c', x: 4, y: 10, w: 1000, h: 2 }
  // ];
  const [layout,setLayout] = useState([]) 
  const target = useRef();

  const onDrop = (layout, oldItem, e,a,b) => {
    console.log('当元素从外部放入网格中时调用',layout,oldItem,e)
    console.log(e.dataTransfer.getData('text'),44444)
    layout = [{ i: 'c', x: 4, y: 10, w: 1, h: 2 }]

    setLayout(layout)
    // left = e.pageX - page.current.offsetLeft;
    // top = e.pageY;
    // setStyle({
    //   ...style,
    //   left,
    //   top,
    // });
    const type = e.dataTransfer.getData('text')
    dispatch({
      type: "selected/add",
      payload: {
        type
      },
    });
  };
  const layout1 = [{"id":"057262","item":{"type":"Image","config":{"translate":[0,0],"align":"center","titText":"","titFontSize":20,"titColor":"rgba(0,0,0,1)","titFontWeight":"400","subTitText":"","subTitFontSize":16,"subTitColor":"rgba(0,0,0,1)","subTitFontWeight":"400","imgUrl":[{"uid":"001","name":"image.png","status":"done","url":"http://49.234.61.19/uploads/bg_174e470dc22.png"}],"round":0,"baseTop":0,"baseLeft":0,"baseRadius":0,"baseRotate":0,"baseScale":100,"baseHeight":100,"baseWidth":100},"h":80,"editableEl":[{"key":"baseTop","name":"纵向位移","type":"Number"},{"key":"baseLeft","name":"横向位移","type":"Number"},{"key":"baseRadius","name":"圆角","type":"Number"},{"key":"baseRotate","name":"旋转","type":"Number"},{"key":"baseScale","name":"缩放","type":"Number"},{"key":"baseHeight","name":"容器高度%","type":"Number"},{"key":"baseWidth","name":"容器宽度%","type":"Number"},{"key":"translate","name":"文字偏移","type":"Pos"},{"key":"align","name":"对齐方式","type":"Select","range":[{"key":"left","text":"左对齐"},{"key":"center","text":"居中对齐"},{"key":"right","text":"右对齐"}]},{"key":"titText","name":"标题文字","type":"Text"},{"key":"titFontSize","name":"标题大小","type":"Number"},{"key":"titColor","name":"标题颜色","type":"Color"},{"key":"titFontWeight","name":"标题粗细","type":"Select","range":[{"key":"300","text":"300 x 300"},{"key":"400","text":"400 x 400"},{"key":"500","text":"500 x 500"},{"key":"600","text":"600 x 600"}]},{"key":"subTitText","name":"副标题文字","type":"Text"},{"key":"subTitFontSize","name":"副标题大小","type":"Number"},{"key":"subTitColor","name":"副标题颜色","type":"Color"},{"key":"subTitFontWeight","name":"副标题粗细","type":"Select","range":[{"key":"300","text":"300 x 300"},{"key":"400","text":"400 x 400"},{"key":"500","text":"500 x 500"},{"key":"600","text":"600 x 600"}]},{"key":"imgUrl","name":"上传图片","type":"Upload","isCrop":false},{"key":"round","name":"圆角","type":"Number"}],"category":"base","x":0},"point":{"i":"x-0","x":0,"y":44,"w":24,"h":80,"isBounded":true},"status":"inToCanvas"}]
  return (
    <PageDiv
      // ref={page}
      // onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }} 
    >
      <GridLayout 
        style={{minHeight:700}}
        className="layout" 
        layout={layout}  //
        cols={1} 
        rowHeight={2}
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
        onDrop={onDrop}  //data参数（ layout, oldItem, newItem, placeholder, e, element） 已删除？
        onLayoutChange={(data)=>{console.log('回调，因此您可以保存布局',data)}}
        onDropDragOver={data=>{console.log('当元素从外部从上方拖到网格上方时调用',data)}}  //已删除？
        onDragStart={(data,a,b,c,d,e,f)=>{console.log('拖动开始时调用',data,a,b,c,d,e,f)}}
        onDragStop={data=>{console.log('拖动完成时调用。',data)}}
        onResizeStart={data=>{console.log('调整大小开始时调用',data)}}
        onResize={data=>{console.log('发生尺寸调整移动时调用',data)}}
        onResizeStop={data=>{console.log('调整大小后调用',data)}}
        //innerRef={}  //Ref获取网格包装div的参考  //已删除？
      >
        {
          layout.map((item,index)=>{
            return <div key={index} data-grid={{"i":"x-0","x":0,"y":0,"w":1,"h":80,"isBounded":true}}>
              <img src="https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png" alt=""/>
            </div>
          })
        }
      </GridLayout>

      {/* {
        selected.length && selected.map((item,index)=>(
          <DragDiv className="drag" style={{
            position: "absolute",
            top: item.t,
            left: item.l,
            width: item.w,
            height: item.h,
            zIndex: item.order
          }} ref={target} key={index} onMouseDown={down} onMouseMove = {move}>
            <EditorPoint className="point-top"></EditorPoint>
            <EditorPoint className="point-top-right"></EditorPoint>
            <EditorPoint className="point-right"></EditorPoint>
            <EditorPoint className="point-bottom-right"></EditorPoint>
            <EditorPoint className="point-bottom"></EditorPoint>
            <EditorPoint className="point-bottom-left"></EditorPoint>
            <EditorPoint className="point-left"></EditorPoint>
            <EditorPoint className="point-top-left"></EditorPoint>
          </DragDiv>
        ))
      } */}

    </PageDiv>
  );
};

export default Drag1;
