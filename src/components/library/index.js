import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const ChatBox = e => {
	const [speechIndex, setSpeechIndex] = useState(0);
	const [chatText, setChatText] = useState([]);
	const showSpeech = index => {
		console.log(banList[speechIndex], index, speechIndex, 'oooooo');
		const selfText = banList[speechIndex].data[index].name;
		let chatTextArr = [];
		if (speechIndex > 0) {
			chatTextArr = banList[speechIndex].speech.map(item => {
				return {
					self: false,
					text: item,
				};
			});
		} else {
			chatTextArr = banList[speechIndex].data[index].speech.map(item => {
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
		console.log(chat, 3333);
		setChatText(chat);
		const i = speechIndex + 1;
		setSpeechIndex(i);
	};
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
						<span style={{ color: '#0365d0', 'font-weight': 600 }}>点击下方按钮即可↓</span>
					</div>
				</div>
				{chatText.map((item, index) => {
					if (item.self) {
						return (
							<div className="chatItem chatRight" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/header2.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text }}></div>
							</div>
						);
					} else {
						return (
							<div className="chatItem chatLeft" key={index}>
								<div className="avatar">
									<img src="https://dub.meimuoni.cn/derren/110/Picture/bing.png" alt="" />
								</div>
								<div className="chatText" dangerouslySetInnerHTML={{ __html: item.text }}></div>
							</div>
						);
					}
				})}
				{speechIndex === 7 ? (
					<div className="wechatBot">
						<div className="copyWechatBox">
							<span className="name">微信号:</span>
							<span oncopy="myFunction2()" className="wxh">
								asdfsdf
							</span>
							<span>(长按复制)</span>
						</div>
						<div className="goto">去微信</div>
					</div>
				) : (
					''
				)}
				<div className="select_botton">
					{banList[speechIndex] &&
						banList[speechIndex].data.map((item, index) => (
							<a
								href="javascript:"
								key={index}
								onClick={() => {
									showSpeech(index);
								}}
								style={{ width: banList[speechIndex].width }}
							>
								{item.name}
							</a>
						))}
				</div>
			</div>
		</>
	);
};

export default ChatBox;
