import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LayoutConfig } from '../../typings/LayoutData'

const BottomWechatBox = styled.div`
	bottom:0;
  z-index: 111;
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

const BottomWechat = (props:{config:LayoutConfig}) => {
  const {text1, text2} = props.config
  const myCopy = () => {
    window.location.href = "weixin://";
  }
	return (
		<>
		<BottomWechatBox>
      <div>{text1}：<WxhBox className='wxh' onCopy={myCopy}>test</WxhBox></div>
      <Mt10>{text2}</Mt10>
    </BottomWechatBox>
		</>
	);
};

export default BottomWechat;
