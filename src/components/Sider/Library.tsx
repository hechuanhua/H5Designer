import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import styled from "styled-components";

import { LibraryType } from '@/typings/LayoutData'

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
`
const Icon = styled.div.attrs(props => ({
  className: 'iconfont'
}))`
  font-size:30px
`

const Library = () => {
  const ondragstart = (e:React.DragEvent<HTMLLIElement>, type:LibraryType) => {
    if(e.dataTransfer){
      e.dataTransfer.setData("text/plain", type);
    }
  }
  const dispatch = useDispatch()
	const { layoutType } =  useSelector((state:any) => {
    return state.layoutData;
  });
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
          <div>多选单选</div>
          <Icon>&#xe6ac;</Icon>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'timer') }}>
          <div>计时器</div>
          <Icon>&#xe61b;</Icon>
        </Li>
        {/* <Li onDragStart={(e) => { ondragstart(e, 'video') }}>
          <div>视频</div>
          <Icon>&#xe603;</Icon>
        </Li> */}
        {
          layoutType === 'freedom'?
          <Li onDragStart={(e) => { ondragstart(e, 'bottomWechat') }}> 
            <div>底部微信</div>
            <Icon>&#xe6c7;</Icon>
          </Li>:''
        }
        <Li onDragStart={(e) => { ondragstart(e, 'chat') }}>
          <div>微信对话</div>
          <Icon>&#xe6c7;</Icon>
        </Li>
        {/* <Li onDragStart={(e) => { ondragstart(e, '') }}>
          <div>组件</div>
          <Icon>&#xe7c2;</Icon>
        </Li> */}
      </ul>
    </>
  );

};

export default Library;
