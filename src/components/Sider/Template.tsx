import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message, Popconfirm } from 'antd'
import styled from 'styled-components';
import PreImage from '../Common/PreImage'
import { getTemplateList, getLayoutByTid, deleteTemplate } from '../../api'

import { RootState } from '../../typings/LayoutData'

const TemplateBox = styled.ul`
	height: 100%;
	overflow-y: auto;
`;

const Use = styled.div`
	position: absolute;
	text-align: center;
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
const Delete = styled.div`
	position: absolute;
	text-align: center;
	width: 100px;
	background: #1890ff;
	z-index: 2;
	left: 50%;
	top: 150px;
	transform: translateX(-50%);
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
	&:hover{
		${Use},${Mask},${Delete}{
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
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`



const Template = () => {

	const dispatch = useDispatch()
	const { list } = useSelector((state: RootState) => {
		return state.templateData;
	});
	console.log(list, 'listlist')
	// const [templateList,setTemplateList] = useState([])
	const use = (data: any) => {
		dispatch({
			type: 'layoutData/switchLayout',
			payload: data
		})
		dispatch({
			type: 'templateData/select',
			payload: {
				tid: data.tid,
				title: data.title,
			}
		})
	}

	const deleteHandler = (data: any) => {
		deleteTemplate({ tid: data.tid }).then((res) => {
			console.log(res, 3333)
			message.success('删除成功', 1, () => {
				dispatch({
					type: 'templateData/getTemplateList',
					payload: {}
				})
			})
		})
	}

	useEffect(() => {
		dispatch({
			type: 'templateData/getTemplateList',
			payload: {}
		})
	}, [])

	return (<TemplateBox>
		{
			list.map((item, index) => (
				<LI key={index}>
					<Mask></Mask>
					<Use onClick={() => { use(item) }}>立即使用</Use>
					{
						item.source === 'system' ? '' :
							<Popconfirm
								title="确定删除此模板？"
								onConfirm={() => { deleteHandler(item) }}
								// onCancel={cancel}
								okText="确定"
								cancelText="取消"
							>
								<Delete>删除此模板</Delete>
							</Popconfirm>
					}
					<PreImage src={item.cover} style={{ height: '213px', overflow: 'hidden' }} />
					<TemplateTitle>{item.title}</TemplateTitle>
				</LI>
			))
		}
	</TemplateBox>)
};

export default Template;

