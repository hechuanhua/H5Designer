import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import store from "../../store";

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
  const selected = useSelector(state => {
    return state.selected
  })
  console.log(selected,'selected')
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
    console.log('down',e)
    startX = e.pageX;
    startY = e.pageY;
    oldLeft = parseInt(e.target.style.left);
    oldTop = parseInt(e.target.style.top);
    oldWidth = width;
    oldHeight = height;
    className = e.target.className.replace(/(.*)point-/, "");
  };

  const move = (e) => {
    console.log('move',startX)
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

  const up = () => {};

  const target = useRef();
  useEffect(() => {
    if(selected.length == 0)return
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
        l:left,
        t:top
      },
    });
  };
  return (
    <PageDiv
      ref={page}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {
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
      }
      
    </PageDiv>
  );
};

export default Drag;
