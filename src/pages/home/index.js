import { useEffect, useRef, useState } from 'react';
import { Tabs, Radio, Button, Menu } from 'antd';
import Drag from '../../components/drag/Drag';
import Library from '../../components/library/Library';
import Setting from '../../components/setting/Setting';
import styled from 'styled-components';
import Header from './_Components/Header';
import {
	AppstoreOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	PieChartOutlined,
	DesktopOutlined,
	ContainerOutlined,
	MailOutlined,
} from '@ant-design/icons';
const Container = styled.div`
	top: 60px;
	width: 100%;
	margin-top: 100px;
`;
const Sider = styled.div`
	position: fixed;
	top: 54px;
	left: 0;
	bottom: 0;
	background: #fff;
	width: 300px;
	display: flex;
`;
const Home = props => {
	return (
		<>
			<Header></Header>
			<Container>
				<Sider>
					<Menu
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						mode="inline"
						theme="dark"
						inlineCollapsed={false}
						style={{
							width: '100px',
							background: '#fff',
							color: '#000',
							borderRight: '1px solid #ccd5db',
              boxShadow: '-1px 0 0 0 #e6ebed',
						}}
					>
						<Menu.Item key="1" icon={<PieChartOutlined />}>
							模板库
						</Menu.Item>
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							组件
						</Menu.Item>
						<Menu.Item key="3" icon={<ContainerOutlined />}>
							我的页面
						</Menu.Item>
					</Menu>
					<Library></Library>
				</Sider>

				<Drag></Drag>
				<Setting></Setting>
			</Container>
		</>
	);
};

export default Home;
