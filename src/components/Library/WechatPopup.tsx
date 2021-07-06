import React, { useEffect, useRef, useState, useContext, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import avatar_dou from '../../assets/images/chat/avatar_dou.png'
import goGif from '../../assets/images/popup/go.gif'

import { LayoutConfig } from '../../typings/LayoutData'

const Popup = styled.div`
	height: 100%;
	width: 100%;
	z-index: 100;
	position: fixed;
	left: 0;
	top: 0;
`;
const Wrap = styled.div`
	border-radius: 10px;
	text-align: center;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 94%;
	max-width: 400px;
	padding-top: 26px;
	z-index: 1001;
	font-size: 18px;
	color:#fff;
`;
const Mask = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	z-index: 998;
	display: block;
`;
const Top = styled.div`
	background: #0365d0;
	border-radius: 21px 21px 0 0;
	padding-top: 35px;
	padding-bottom: 20px;
	box-shadow: 0px 3px 0 #ccc;
	position: relative;
`;
const Bottom = styled.div`
	background: #f5f5f5;
	border-radius: 0 0 21px 21px;
	position: relative;
	padding-bottom: 15px;
	padding-top: 8px;
`;
const WxhBox = styled.div`
	width: 53%;
	background: #fff;
	border-radius: 10px;
	height: 50px;
	line-height: 50px;
	margin: 0 auto;
	color: #302e2e;
	font-size: 30px;
	font-weight: 900;
`;
const P = styled.p`
	margin-bottom:10px;
	&:last-child{
		font-size:14px;
	}
`
const Avatar = styled.div`
	position: absolute;
	top: -55px;
	left: 36%;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 1px solid #c0d1e5;
	z-index:1;
`

const WechatPopup = (props: { onClose: () => void }) => {
	const { onClose } = props
	const copy = useRef<HTMLDivElement>()
	const goto = () => {
		const hiddenInput = document.getElementById('copyInput') as HTMLInputElement
		if (!copy.current) return
		hiddenInput.value = copy.current.innerText
		hiddenInput.select(); // 选中文本
		document.execCommand("copy"); // 执行浏览器复制命令
		window.location.href = "weixin://";
	}
	const myCopy = () => {
		window.location.href = "weixin://";
	}
	return (
		<>
			<Popup>
				<Mask onClick={onClose}></Mask>
				<Wrap>
					<Avatar>
						<img src={avatar_dou} alt="" />
					</Avatar>
					<Top>
						<P>添加微信号，获取祛痘秘籍</P>
						<P>↓长按复制，添加微信号↓</P>
						<WxhBox className="wxh" ref={copy as React.RefObject<HTMLDivElement>} onCopy={myCopy}>test</WxhBox>
					</Top>
					<Bottom onClick={goto}>
						<img src={goGif} alt="" style={{ width: '145px' }} />
					</Bottom>
				</Wrap>
			</Popup>
		</>
	);
};

export default WechatPopup;
