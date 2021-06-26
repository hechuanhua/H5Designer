import { useEffect, useRef, useState } from 'react';
import { Tabs, Radio, Button, Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Drag from '../../components/Drag/FlowDrag';
import Setting from '../../components/Setting/Setting';
import styled from 'styled-components';
import Header from './_Components/Header';
import Sider from './_Components/Sider';

const Container = styled.div`
	top: 60px;
	width: 100%;
	margin-top: 100px;
`;

const Home = props => {
	const dispatch = useDispatch();
	useEffect(()=>{
		dispatch({type:'pageData/getHostList',payload:{}})
	},[])
	return (
		<>
			<Header></Header>
			<Container>
				<Sider></Sider>
				<Drag></Drag>
				<Setting></Setting>
			</Container>
		</>
	);
};

export default Home;
