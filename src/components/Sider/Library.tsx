import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import useEqualSelector from 'lib/hooks/useEqualSelector'
import styled from "styled-components";

import { LibraryType } from 'typings/LayoutData'

import Iconfont from 'components/Common/Iconfont'

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

const Library = () => {
  const ondragstart = (e: React.DragEvent<HTMLLIElement>, type: LibraryType) => {
    if (e.dataTransfer) {
      e.dataTransfer.setData("text/plain", type);
    }
  }
  const dispatch = useDispatch()
  const { layoutType } = useEqualSelector((state: any) => {
    return state.layoutData;
  });
  return (
    <>
      <ul>
        <Li onDragStart={(e) => { ondragstart(e, 'img') }}>
          <div>图片</div>
          <Iconfont>&#xe607;</Iconfont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'text') }}>
          <div>文本</div>
          <Iconfont>&#xe8c2;</Iconfont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'radio') }}>
          <div>多选单选</div>
          <Iconfont>&#xe6ac;</Iconfont>
        </Li>
        <Li onDragStart={(e) => { ondragstart(e, 'timer') }}>
          <div>计时器</div>
          <Iconfont>&#xe61b;</Iconfont>
        </Li>
        {/* <Li onDragStart={(e) => { ondragstart(e, 'video') }}>
          <div>视频</div>
          <Iconfont>&#xe603;</Iconfont>
        </Li> */}
        {
          layoutType === 'freedom' ?
            <Li onDragStart={(e) => { ondragstart(e, 'bottomWechat') }}>
              <div>底部微信</div>
              <Iconfont>&#xe6c7;</Iconfont>
            </Li> : ''
        }
        <Li onDragStart={(e) => { ondragstart(e, 'chat') }}>
          <div>微信对话</div>
          <Iconfont>&#xe6c7;</Iconfont>
        </Li>
        {/* <Li onDragStart={(e) => { ondragstart(e, '') }}>
          <div>组件</div>
          <Iconfont>&#xe7c2;</Iconfont>
        </Li> */}
      </ul>
    </>
  );

};

export default Library;
