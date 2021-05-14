import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PagaDataContext } from "../../reducer/index";

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
  const { state,currentType,setCurrentType,dispatch } = useContext(PagaDataContext)
  console.log(state, "Drag");
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
    startX = e.pageX;
    startY = e.pageY;
    oldLeft = left;
    oldTop = top;
    oldWidth = width;
    oldHeight = height;
    className = e.target.className.replace(/(.*)point-/, "");
  };

  const move = (e) => {
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
    maxWidth = page.current.offsetWidth-2;
    maxHeight = page.current.offsetHeight-2;
    console.log(maxWidth,maxHeight)
    setStyle({ ...style});
    target.current.addEventListener("mousedown", (e) => {
      down(e);
      document.addEventListener("mousemove", move);
    });
    document.addEventListener("mouseup", function (e) {
      up(e);
      document.removeEventListener("mousemove", move);
    });
  }, []);

  const onDrop = (e) => {
    console.log(state,currentType,4444);
    const x =  e.pageX;
    const y = e.pageY;
    if(currentType == 'img'){
      dispatch({type:'img',data:{
        
      }})
    }
  };
  return (
    <PageDiv
      ref={page}
      onDrop={onDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <DragDiv className="drag" style={style} ref={target}>
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
