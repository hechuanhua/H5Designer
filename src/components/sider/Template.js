import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const Li = styled.li.attrs(props => ({
	draggable: 'true',
}))`
	text-align: center;
	cursor: pointer;
	flex: 1;
	margin-bottom: 5px;
	padding: 10px 20px;
	border: 1px solid;
	width: 80px;
	margin-left: 10px;
`;
const Icon = styled.div.attrs(props => ({
	className: 'iconfont',
}))`
	font-size: 30px;
`;

const Template = e => {
	return <div>模板</div>;
};

export default Template;
