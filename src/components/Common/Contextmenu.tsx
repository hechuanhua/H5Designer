import React, { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import {onDrop} from '@/components/Drag/generateDom';

const MenuBox = styled.ul`
  position:fixed;
  top:0;
  left:0;
  z-index:20;
  width: 100px;
  background: #fff;
  padding: 5px 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.8), 0 0 0 1px #eee;
  li{
    padding: 4px 10px;
    cursor: pointer;
    &:hover{
      background:#1890ff;
      color:#fff;
    }
  }
`


const Contextmenu = () => {
  const current = useSelector((state:any) => {
		return state.layoutData.current;
	});

  const contextmenu = useSelector((state:any) => {
		return state.pageData.contextmenu;
	});

  const dispatch = useDispatch()
  useEffect(()=>{
    const el = document.querySelector<HTMLElement>('#canvas');
    if(el){
      el.oncontextmenu = function(e:MouseEvent){
        e.preventDefault();
        dispatch({type:'pageData/setContextmenu',payload:{
          isShow:true,
          x:e.pageX + 10,
          y:e.pageY
        }})
      }
    }
  })

  const handleDelete = () => {
    dispatch({
			type: 'layoutData/remove',
			payload: {},
		});
    dispatch({type:'pageData/setContextmenu',payload:{
      isShow:false,
    }})
  }

  const handleCopy = () => {
    const data = {
      ...current,
			position:{
        ...current.position,
        y:current.position.y + current.position.h
      }
		};
    onDrop({dispatch, type:'contextmenu', data})
    dispatch({type:'pageData/setContextmenu',payload:{
      isShow:false,
    }})
  }

  return(
    <>
      {
        contextmenu.isShow?
          <MenuBox style={{top:contextmenu.y+'px',left:contextmenu.x}}>
            <li onClick={handleDelete}>删除</li>
            <li onClick={handleCopy}>复制</li>
        </MenuBox>:''
      }
    </>
  )
}

export default Contextmenu