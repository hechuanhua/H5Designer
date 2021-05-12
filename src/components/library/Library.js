import { useEffect, useRef, useState, useContext } from "react";
import styled from "styled-components";
import { PagaDataContext } from "../../reducer/index"

const StyleLibarary = styled.div`
  flex:1
`
const ondragstart = (e) => {
  console.log(e, 111)
}
const StyleItem = styled.li.attrs(props => ({
  draggable: 'true',
  onDragStart: ondragstart
}))`
  width:100px;
  height:100px;
  display:inline-block;
  text-align:center;
  cursor: pointer;
`

const Library = () => {
  const { Color,dispatch } = useContext(PagaDataContext)
  
  useEffect(()=>{
    dispatch({type:'background',data:'111'})
  },[])
  return (
    <StyleLibarary>
      <ul>
        <StyleItem>
          <div className="img">图片</div>
        </StyleItem>
        <StyleItem>
          <div className="img">图片</div>
        </StyleItem>
        <StyleItem>
          <div className="img">图片</div>
        </StyleItem>
      </ul>
    </StyleLibarary>
  );

};

export default Library;
