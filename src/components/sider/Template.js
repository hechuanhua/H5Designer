import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PreImage from '../common/Image'
import { getTemplateList, getLayoutByTid } from '../../api'

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
	margin-right:10px;
	margin-top:10px;
	cursor: pointer;
	position:relative;
	vertical-align: middle;
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
const TemplateTitle = styled.div`
	text-align: center;
	background: #1890ff;
	color: #fff;
	margin-top: 5px;
	padding: 5px 0;
	font-size: 14px;
`

const Template = e => {
	
	const dispatch = useDispatch()
	const { list } =  useSelector(state => {
    return state.templateData;
  });
	console.log(list,'listlist')
	// const [templateList,setTemplateList] = useState([])
	const use = (data) => {
		dispatch({
			type: 'layoutData/switchLayout',
			payload: data
		})
		dispatch({
			type: 'templateData/select',
			payload: {
				tid:data.tid,
				title:data.title,
			}
		})
	}

	useEffect(()=>{
		dispatch({
			type: 'templateData/getTemplateList',
			payload: {}
		})
		// getLayoutByTid({tid:'5A8349'})

	},[])

	return( <TemplateBox>
		{
			list.map((item,index)=>(
				<LI key={index}>
					<Mask></Mask>
					<Use onClick={()=>{use(item)}}>立即使用</Use>
					<PreImage src={item.cover} style={{height:'213px',overflow:'hidden'}}/>
					<TemplateTitle>{item.title}</TemplateTitle>
				</LI>
			))
		}
	</TemplateBox>)
};

export default Template;

