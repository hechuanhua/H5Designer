import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

import { throttle } from '../../utils/index'

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
  const { dispatch } = useDispatch()
  const target = useRef();
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
    top: 100,
    left: 100,
    width: width,
    height: height,
  };
  const [style, setStyle] = useState(styleDefault);
  const down = (e) => {
    // startX = e.pageX;
    // startY = e.pageY;
    // oldLeft = parseInt(target.current.style.left);
    // oldTop = parseInt(target.current.style.top);
    // oldWidth = width;
    // oldHeight = height;
    className = e.target.className.replace(/(.*)point-/, "");
    target.current.mouseUp = true
    target.current.startX = e.pageX
    target.current.startY = e.pageY
    target.current.oldLeft = parseInt(target.current.style.left);
    target.current.oldTop = parseInt(target.current.style.top);
    target.current.oldWidth = parseInt(target.current.style.width)
    target.current.oldHeight = parseInt(target.current.style.height)
    console.log('down', className, target.current.startX, target.current.startY, oldLeft, oldTop)

  };
  // console.log('aaaaa')
  const move = (e) => {
    if (!target.current.mouseUp) return
    e.stopPropagation();
    e.preventDefault();
    const oldWidth = target.current.oldWidth
    const oldHeight = target.current.oldHeight
    const oldTop = target.current.oldTop
    const oldLeft = target.current.oldLeft
    let moveX = e.pageX - target.current.startX;
    let moveY = e.pageY - target.current.startY;
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
        console.log('move', moveX, moveY)
        console.log('left top', top, left)
        break;
    }
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    // if (width + left > maxWidth) {
    //   width = maxWidth - left;
    // }
    // if (height + top > maxHeight) {
    //   height = maxHeight - top;
    // }
    // console.log(className,top, left, moveX,moveY,startX,startY,e.pageX,e.pageY )
    setStyle({ ...style, top, left, width, height });
  };

  const up = () => {
    target.current.mouseUp = null
  };


  // useEffect(() => {
  //   maxWidth = page.current.offsetWidth-2;
  //   maxHeight = page.current.offsetHeight-2;
  //   console.log(maxWidth,maxHeight)
  //   setStyle({ ...style});
  //   target.current.addEventListener("mousedown", (e) => {
  //     down(e);
  //     document.addEventListener("mousemove", move);
  //   });
  //   document.addEventListener("mouseup", function (e) {
  //     up(e);
  //     document.removeEventListener("mousemove", move);
  //   });
  // }, []);

  const onDrop = (e) => {
    const x = e.pageX;
    const y = e.pageY;
  };
  return (
    <PageDiv
      ref={page}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <DragDiv className="drag" style={style} ref={target} onMouseDown={down} onMouseUp={up} onMouseMove={(e)=>{
        throttle(()=>{move(e)},200)()
      }}>
        <EditorPoint className="point-top"></EditorPoint>
        <EditorPoint className="point-top-right"></EditorPoint>
        <EditorPoint className="point-right"></EditorPoint>
        <EditorPoint className="point-bottom-right"></EditorPoint>
        <EditorPoint className="point-bottom"></EditorPoint>
        <EditorPoint className="point-bottom-left"></EditorPoint>
        <EditorPoint className="point-left"></EditorPoint>
        <EditorPoint className="point-top-left"></EditorPoint>
      </DragDiv>
    </PageDiv>
  );
};

export default Drag;
