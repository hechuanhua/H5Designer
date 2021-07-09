import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Iconfont from 'components/Common/Iconfont'

const MyPage = styled.div``;

const FlexItem = styled.div`
	flex:1;
	margin:0 20px
`;
const Li = styled.li`
	display: flex;
	align-items: center;
	font-size: 14px;
	padding:0 10px;
`;
const Operation = styled.div`
	display:flex;
	cursor: pointer;
`
const MyPages = () => {
	return (
		<MyPage>
			<h2>我的页面</h2>
			<ul>
				<Li>
					<span>1</span>
					<FlexItem>我的页面1</FlexItem>
					<Operation>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe613;</Iconfont>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe65f;</Iconfont>
					</Operation>
				</Li>
				<Li> 
					<span>2</span>
					<FlexItem>我的页面2</FlexItem>
					<Operation>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe613;</Iconfont>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe65f;</Iconfont>
					</Operation>
				</Li>
				<Li>
					<span>3</span>
					<FlexItem>我的页面3</FlexItem>
					<Operation>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe613;</Iconfont>
						<Iconfont style={{'marginLeft':'5px','fontSize':'18px'}}>&#xe65f;</Iconfont>
					</Operation>
				</Li>
			</ul>
		</MyPage>
	);
};

export default MyPages;
