import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import store from "../../store";
import GridLayout from 'react-grid-layout';

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
  const page = useRef();
  let startX = 0,
    startY = 0,
    oldLeft = 0,
    oldTop = 0,
    left = 0,
    top = 0,
    width = 200,
    height = 100,
    oldWidth = width,
    oldHeight = height,
    className = "";
  let maxWidth = 100;
  let maxHeight = 100;
  const styleDefault = {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  };
  const [style, setStyle] = useState(styleDefault);
  const down = (e) => {
    console.log('down', e)
    startX = e.pageX;
    startY = e.pageY;
    oldLeft = parseInt(e.target.style.left);
    oldTop = parseInt(e.target.style.top);
    oldWidth = width;
    oldHeight = height;
    className = e.target.className.replace(/(.*)point-/, "");
  };

  const move = (e) => {
    console.log('move', startX)
    e.stopPropagation();
    e.preventDefault();
    let moveX = e.pageX - startX;
    let moveY = e.pageY - startY;
    switch (className) {
      case "top":
        height = oldHeight - moveY;
        top = oldTop + moveY;
        break;
      case "right":
        width = moveX + oldWidth;
        break;
      case "bottom":
        height = moveY + oldHeight;
        break;
      case "left":
        width = oldWidth - moveX;
        left = oldLeft + moveX;
        break;
      case "top-right":
        height = oldHeight - moveY;
        width = moveX + oldWidth;
        top = oldTop + moveY;
        break;
      case "bottom-right":
        height = moveY + oldHeight;
        width = moveX + oldWidth;
        break;
      case "bottom-left":
        height = moveY + oldHeight;
        width = oldWidth - moveX;
        left = oldLeft + moveX;
        break;
      case "top-left":
        height = oldHeight - moveY;
        top = oldTop + moveY;
        width = oldWidth - moveX;
        left = oldLeft + moveX;
        break;

      default:
        left = Number(oldLeft) + moveX;
        top = Number(oldTop) + moveY;
        if (width + left > maxWidth) {
          left = maxWidth - width;
        }
        if (height + top > maxHeight) {
          top = maxHeight - height;
        }
        break;
    }
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    if (width + left > maxWidth) {
      width = maxWidth - left;
    }
    if (height + top > maxHeight) {
      height = maxHeight - top;
    }

    setStyle({ ...style, top, left, width, height });
  };

  const up = () => { };

  const target = useRef();
  useEffect(() => {
    if (selected.length == 0) return
    console.log(333)
    maxWidth = page.current.offsetWidth - 2;
    maxHeight = page.current.offsetHeight - 2;
    console.log(maxWidth, maxHeight);
    setStyle({ ...style });
    // target.current.addEventListener("mousedown", (e) => {
    //   down(e);
    //   document.addEventListener("mousemove", move);
    // });
    // document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", function (e) {
      up(e);
      document.removeEventListener("mousemove", move);
    });
  }, [JSON.stringify(selected)]);

  const onDrop = (e) => {
    console.log(e.dataTransfer.getData('text'),44444)
    left = e.pageX - page.current.offsetLeft;
    top = e.pageY;
    setStyle({
      ...style,
      left,
      top,
    });
    dispatch({
      type: "selected/addLibrary",
      payload: {
        l: left,
        t: top
      },
    });
  };
  const layout = [ 
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ];
  // return (

  //   <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
  //     <div key="a">a</div>
  //     <div key="b">b</div>
  //     <div key="c">c</div>
  //   </GridLayout> 
  // )
  return (
    <PageDiv
      ref={page}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <GridLayout 
        style={{minHeight:700}}
        className="layout" 
        layout={layout}  //
        cols={1} 
        rowHeight={80}
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
        transformScale={1}  //拖动速度比例
        preventCollision={false} //拖动后不会调换位置
        onDrop={(data,a,b)=>{console.log('当元素从外部放入网格中时调用',data,a,b)}}  //data参数（ layout, oldItem, newItem, placeholder, e, element） 已删除？
        onLayoutChange={(data)=>{console.log('回调，因此您可以保存布局',data)}}
        onDropDragOver={data=>{console.log('当元素从外部从上方拖到网格上方时调用',data)}}  //已删除？
        onDragStart={data=>{console.log('拖动开始时调用',data)}}
        onDragStop={data=>{console.log('拖动完成时调用。',data)}}
        onResizeStart={data=>{console.log('调整大小开始时调用',data)}}
        onResize={data=>{console.log('发生尺寸调整移动时调用',data)}}
        onResizeStop={data=>{console.log('调整大小后调用',data)}}
        //innerRef={}  //Ref获取网格包装div的参考  //已删除？
      >
        {
          layout.map((item,index)=>{
            return <div key={index}>{item.i}</div>
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
