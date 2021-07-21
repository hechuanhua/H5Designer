import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import DragContainer from 'components/Draggable/FlowDrag';
import SettingContainer from 'components/Setting/Setting';
import styled from 'styled-components';
import Header from './_Components/Header';
import SiderContainer from './_Components/SiderContainer';
import Contextmenu from 'components/Common/Contextmenu';

const Container = styled.div`
	top: 60px;
	width: 100%;
	margin-top: 100px;
`;

const Home = () => {
	const contextmenu = useEqualSelector((state: any) => {
    return state.pageData.contextmenu;
  });

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({ type: 'pageData/getHostList', payload: {} })
	}, [])

	const handleHide = () => {
		if(contextmenu.isShow){
			dispatch({
				type: 'pageData/setContextmenu', payload: {
					isShow: false,
				}
			})
		}
	}

	return (
		<div onClick={handleHide}>
			<Header></Header>
			<Container>
				<SiderContainer></SiderContainer>
				<DragContainer></DragContainer>
				<SettingContainer></SettingContainer>
			</Container>
			<Contextmenu></Contextmenu>
		</div>
	);
};

export default Home;
