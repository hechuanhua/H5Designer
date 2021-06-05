import { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";


const Li = styled.li.attrs(props => ({
  draggable: 'true'
}))`
  text-align:center;
  cursor: pointer;
  flex:1;
  margin-bottom: 5px;
  padding: 10px 20px;
  border: 1px solid;
  width:80px;
  margin-left:10px;
`
const Icon = styled.div.attrs(props => ({
  className: 'iconfont'
}))`
  font-size:30px
`

const Library = (e) => {
  const dispatch = useDispatch()
  const ondragstart = (e, type) => {
    console.log(e, 111)
    e.dataTransfer.setData("text/plain", type);
  }
  return (
    <>
      <ul>
        <Li onDragStart={(e) => { ondragstart(e, 'img') }}>
          <div>图片</div>
          <Icon>&#xe607;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'text') }}>
          <div>文本</div>
          <Icon>&#xe8c2;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'radio') }}>
          <div>单选</div>
          <Icon>&#xe667;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'checkbox') }}>
          <div>多选</div>
          <Icon>&#xe690;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'video') }}>
          <div>视频</div>
          <Icon>&#xe603;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, '') }}>
          <div>组件</div>
          <Icon>&#xe7c2;</Icon>
        </Li>
      </ul>
    </>
  );

};

export default Library;
