import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';

import { LayoutConfig } from '@/typings/LayoutData'

interface ChatDialogProps {
	config:LayoutConfig
	type?:string
}

interface ChatText {
	self:boolean
	text?:string
}
const ChatDialog = (props:ChatDialogProps) => {

	const { type } = props
	const dataSource:any = JSON.parse(props.config.data as string)
	
	console.log(dataSource,'ChatChatChat')
	
	const [speechIndex, setSpeechIndex] = useState(0);
	const [chatText, setChatText] = useState([] as Array<ChatText>);
	const w = document.documentElement.clientWidth > initData.maxWidth? initData.maxWidth : document.documentElement.clientWidth
	const showSpeech = (index:number) => {
		console.log(dataSource[speechIndex], index, speechIndex, 'oooooo');
		const selfText = dataSource[speechIndex].data[index].name;
		let chatTextArr = [];
		if (speechIndex > 0) {
			chatTextArr = dataSource[speechIndex].speech.map((item:string) => {
				return {
					self: false,
					text: item,
				};
			});
		} else {
			chatTextArr = dataSource[speechIndex].data[index].speech.map((item:string) => {
				return {
					self: false,
					text: item,
				};
			});
		}

		let obj = [
			{
				self: true,
				text: selfText,
			},
			...chatTextArr,
		];
		const chat = [...chatText, ...obj];
		setChatText(chat);
		const i = speechIndex + 1;
		setSpeechIndex(i);
		
	};
	useEffect(()=>{
		if(type === 'preview'){
			document.documentElement.scrollTop = 100000
		}
	},[speechIndex])

	const myCopy = () => {
    window.location.href = "weixin://";
  }

	return (
		<>
			<div className="chatBox">
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText">您好，系统已为您分配专业淡斑老师，一对一为您服务！</div>
				</div>
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText"> 您好，我是专业淡斑老师，非常高兴为您服务！</div>
				</div>
				<div className="chatItem chatLeft">
					<div className="avatar">
						<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
					</div>
					<div className="chatText">
						{' '}
						咱们的色斑是怎么产生的呢？
						<br />
						<span style={{ color: '#0365d0', 'fontWeight': 600 }}>点击下方按钮即可↓</span>
					</div>
				</div>
				{chatText.map((item, index) => {
					if (item.self) {
						return (
							<div className="chatItem chatRight" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/header2.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text as string }}></div>
							</div>
						);
					} else {
						return (
							<div className="chatItem chatLeft" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text as string }}></div>
							</div>
						);
					}
				})}
				{speechIndex === 7 ? (
					<div className="wechatBot">
						<div className="copyWechatBox">
							<span className="name">微信号:</span>
							<span onCopy={myCopy} className="wxh">test</span>
							<span>(长按复制)</span>
						</div>
						<div className="goto">去微信</div>
					</div>
				) : (
					''
				)}
				<div className="select_botton" style={{width:w}}>
					{dataSource[speechIndex] &&
						dataSource[speechIndex].data.map((item:any, index:number) => (
							<a
								key={index}
								onClick={() => {
									showSpeech(index);
								}}
								style={{ width: dataSource[speechIndex].width }}
							>
								{item.name}
							</a>
						))}
				</div>
			</div>
		</>
	);
};

export default ChatDialog;
