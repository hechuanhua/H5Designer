import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

const StyleLibarary = styled.div`
  flex:1
`
const StyleItem = styled.li.attrs(props => ({
  draggable: 'true'
}))`
  width:100px;
  height:100px;
  display:inline-block;
  text-align:center;
  cursor: pointer;
`
const StyleFont = styled.div.attrs(props=>({
  className:'iconfont'
}))`
  font-size:50px
`

const Library = () => {
  const dispatch = useDispatch()
  const ondragstart = (e) => {
    console.log(e, 111)
    // dispatch({type:'img',data:'111'})
    dispatch({ type: 'setType/setType', payload:{type:'img'} })
    
  }
  return (
    <StyleLibarary>
      <ul>
        <StyleItem onDragStart={ondragstart}>
          <div className="img">
            <StyleFont>&#xe607;</StyleFont>
            图片</div>
        </StyleItem>
        <StyleItem onDragStart={ondragstart}>
          <div className="img">图片</div>
        </StyleItem>
        <StyleItem onDragStart={ondragstart}>
          <div className="img">图片</div>
        </StyleItem>
      </ul>
    </StyleLibarary>
  );

};

export default Library;
