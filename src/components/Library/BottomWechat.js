import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';

const BottomWechatBox = styled.div`
	// width: ${initData.maxWidth}px;
	// position: fixed;
	bottom:0;
  text-align:center;
  background: rgba(0,0,0);
  z-index: 111;
  color: #fff;
  font-size: 18px;
  padding: 10px;
`;
const Mt10 = styled.div`
	margin-top:10px;
`
const WxhBox = styled.span`
	color: red;
	background-color: yellow;
	font-size: 22px;
	font-weight: bold;
`

const BottomWechat = props => {
  const {text} = props.config
  const myCopy = () => {
    window.location.href = "weixin://";
  }
	return (
		<>
		<BottomWechatBox>
      <div>{text}：<WxhBox className='wxh' onCopy={myCopy}>test</WxhBox></div>
      <Mt10>长按复制，获取祛痘方案</Mt10>
    </BottomWechatBox>
		</>
	);
};

export default BottomWechat;
