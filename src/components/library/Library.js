import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

const Sider = styled.div`
  position:fixed;
  top:20px;
  left:320px;
  ul{
    display:flex;
    flex-direction: column;
  }
`
const Li = styled.li.attrs(props => ({
  draggable: 'true'
}))`
  width:100px;
  height:100px;
  display:inline-block;
  text-align:center;
  cursor: pointer;
  flex:1;
  margin-top: 5px;
  padding: 10px 20px;
  border: 1px solid;
`
const StyleFont = styled.div.attrs(props => ({
  className: 'iconfont'
}))`
  font-size:50px
`

const Library = (e) => {
  const dispatch = useDispatch()
  const ondragstart = (e, type) => {
    console.log(e, 111)
    e.dataTransfer.setData("text/plain", type);
  }
  return (
    <Sider>
      <h2>组件设置</h2>
      <ul>
        <Li onDragStart={(e) => { ondragstart(e, 'img') }}>
          <div className="name">图片</div>
          <StyleFont>&#xe607;</StyleFont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'text') }}>
          <div className="name">文本</div>
          <StyleFont>&#xe8c2;</StyleFont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e,'video') }}>
          <div className="name">视频</div>
          <StyleFont>&#xe603;</StyleFont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e,'') }}>
          <div className="name">组件</div>
          <StyleFont>&#xe7c2;</StyleFont>
        </Li>
      </ul>
    </Sider>
  );

};

export default Library;
