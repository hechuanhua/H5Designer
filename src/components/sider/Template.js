import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PreImage from '../common/Image'
import { getTemplateList, getLayoutById } from '../../api'

const TemplateBox = styled.ul`
	// display:flex
`;

const Use = styled.div`
	position: absolute;
	width: 80px;
	background: #1890ff;
	z-index: 2;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	padding: 5px 10px;
	border-radius: 5px;
	font-size: 14px;
	color:#fff;
	display:none;
`
const Mask = styled.div`
	position: absolute;
	left:0;
	top:0;
	bottom:0;
	right:0;
	display:none;
	background:rgba(0,0,0,0.5);
	z-index:1;
`
const LI = styled.li`
	width:120px;
	display:inline-block;
	height:213px;
	margin-right:10px;
	margin-top:10px;
	cursor: pointer;
	position:relative;
	&:nth-child(2n){
		margin-right:0;
	}
	img{
		height:100%;
	}
	&:hover{
		${Use},${Mask}{
			display:block
		}
	}
`

const Template = e => {
	const [templateList,setTemplateList] = useState([])
	const use = () => {
		console.log('use')
	}
	useEffect(()=>{
		getTemplateList().then((res)=>{
			console.log(res)
			setTemplateList(res.list)
		})
		getLayoutById({tid:'A46A56'}).then((res)=>{
			console.log(res)
		})
	},[])
	return( <TemplateBox>
		{
			templateList.map((item,index)=>(
				<LI key={index}>
					<Mask></Mask>
					<Use onClick={use}>立即使用</Use>
					<PreImage src={item.cover}/>
				</LI>
			))
		}
	</TemplateBox>)
};

export default Template;
