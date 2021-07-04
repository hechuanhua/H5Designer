import { useEffect, useRef, useState } from 'react';
import { Tabs, Radio, Button, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Drag from '../../components/Drag/FlowDrag';
import Setting from '../../components/Setting/Setting';
import styled from 'styled-components';
import Header from './_Components/Header';
import Sider from './_Components/Sider';
import Contextmenu from '@/components/Common/Contextmenu';

const Container = styled.div`
	top: 60px;
	width: 100%;
	margin-top: 100px;
`;

const Home = () => {
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch({type:'pageData/getHostList',payload:{}})
	},[])

	const handleHide = () => {
		dispatch({type:'pageData/setContextmenu',payload:{
			isShow:false,
		}})
	}
	
	return (
		<div onClick={handleHide}>
			<Header></Header>
			<Container>
				<Sider></Sider>
				<Drag></Drag>
				<Setting></Setting>
			</Container>
			<Contextmenu></Contextmenu>
		</div>
	);
};

export default Home;
