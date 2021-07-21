import { useEffect, useRef, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import Iconfont from 'components/Common/Iconfont'

const MyPage = styled.div``;

const PopupTemplate = () => {
	return (
		<MyPage>
			<h2>弹窗库</h2>
		</MyPage>
	);
};

export default PopupTemplate;
