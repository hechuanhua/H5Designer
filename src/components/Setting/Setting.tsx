import { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import { Form, Tabs, Select, Input } from 'antd';

import TextSetting from './TextSetting';
import ImgSetting from './ImgSetting';
import RadioSetting from './RadioSetting';
import ChatSetting from './ChatSetting';
import BottomWechatSetting from './BottomWechatSetting';
import TimerSetting from './TimerSetting';

import { jumpData } from 'config/dataSoure';

import { RootState } from 'typings/LayoutData'

const { TabPane } = Tabs;

const SettingWrap = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	position: fixed;
	right: 10px;
	top: 54px;
	bottom: 0;
	width: 300px;
	background: #fff;
	padding-left: 20px;
`;
const Setting = () => {
	const current = useEqualSelector((state: RootState) => {
		return state.layoutData.current;
	});

	const [activeKey, setActiveKey] = useState('1')
	console.log(current, 'Settingcurrent');
	const generateDOM = () => {
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
		if (current.config.type === 'bottomWechat') {
			return <BottomWechatSetting></BottomWechatSetting>;
		}
		if (current.config.type === 'timer') {
			return <TimerSetting></TimerSetting>;
		}
	};

	useEffect(()=>{
		setActiveKey('1')
	},[current.id])

	return (
		<SettingWrap>
			<Tabs activeKey={activeKey} onTabClick={(key)=>{setActiveKey(key)}}>
				<TabPane tab="属性设置" key="1">
					{current.id ? generateDOM() : ''}
				</TabPane>
				<TabPane tab="交互" key="2">
					<Form>
						<Form.Item label="跳转目标" name="jump">
							<Select allowClear>
								{
									jumpData.map((item,index)=>(
										<Select.Option value={item.value} key={index}>{item.label}</Select.Option>
									))
								}
							</Select>
						</Form.Item>
						<Form.Item label="链接" name="url">
							<Input/>
						</Form.Item>
					</Form>
				</TabPane>
			</Tabs>
			
		</SettingWrap>
	);
};

export default Setting;
