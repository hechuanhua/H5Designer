import "./drag.scss";
import { useEffect, useRef, useState, useContext } from "react";
import { PagaDataContext } from "../../reducer/index"

const Drag = () => {
  const { Color,dispatch } = useContext(PagaDataContext)
  console.log(Color,444)
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
  let maxWidth = 100
  let maxHeight = 100
  const styleDefault = {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
  };
  const [style, setStyle] = useState(styleDefault);
  console.log(222,maxWidth,maxHeight)
  const down = (e) => {
    startX = e.pageX;
    startY = e.pageY;
    oldLeft = left;
    oldTop = top;
    oldWidth = width;
    oldHeight = height;
    className = e.target.className.replace("editor-point point-", "");
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
        break;
    }
    if (top < 0) top = 0;
    if (left < 0) left = 0;
    console.log(maxWidth,maxHeight)
    if (width > maxWidth) width = maxWidth;
    if (height > maxHeight) height = maxHeight;
    if(width + left > maxWidth){width = maxWidth - left}
    if(height + top > maxHeight){height = maxHeight - top}
    setStyle({ ...style, top, left, width, height });
  };

  const up = () => {
    console.log("up");
  };

  const target = useRef();
  useEffect(() => {
    maxWidth = page.current.offsetWidth
    maxHeight = page.current.offsetHeight
    setStyle({...style,maxWidth,maxHeight})
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
    console.log(4444)
  }
  return (
    <div className="page" ref={page} onDrop={onDrop} onDragOver={(e)=>{e.preventDefault();console.log(5555)}}>
      <div className="drag" style={style} ref={target}>
        <div className="editor-point point-top"></div>
        <div className="editor-point point-top-right"></div>
        <div className="editor-point point-right"></div>
        <div className="editor-point point-bottom-right"></div>
        <div className="editor-point point-bottom"></div>
        <div className="editor-point point-bottom-left"></div>
        <div className="editor-point point-left"></div>
        <div className="editor-point point-top-left"></div>
      </div>
    </div>
  );
};

export default Drag;
