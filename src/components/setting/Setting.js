import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import TextSetting from './TextSetting';
import ImgSetting from './ImgSetting';
import RadioSetting from './RadioSetting';
import ChatSetting from './ChatSetting';

const SettingWrap = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	position: fixed;
	right: 0;
	top: 54px;
	bottom: 0;
	width: 300px;
	background: #fff;
`;
const Setting = e => {
	const current = useSelector(state => {
		return state.setLibrary.current;
	});
	console.log(current, 'Settingcurrent');
	const generateDOM = () => {
		console.log('generateDOM');
		if (current.config.type === 'img') {
			return <ImgSetting></ImgSetting>;
		}
		if (current.config.type === 'text') {
			return <TextSetting></TextSetting>;
		}
		if (current.config.type === 'radio') {
			return <RadioSetting></RadioSetting>;
		}
		if (current.config.type === 'chat') {
			return <ChatSetting></ChatSetting>;
		}
	};
	return (
		<SettingWrap>
			<h2>属性设置</h2>
			{current.id ? generateDOM() : ''}
		</SettingWrap>
	);
};

export default Setting;
