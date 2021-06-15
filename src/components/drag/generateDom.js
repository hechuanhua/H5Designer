import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatDialog from '../library/ChatDialog';
import { createUuid } from '../../utils/index';
import initData from '../../config/initData';
import styled from 'styled-components';

const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
	input{
		margin-right:5px;
	}
`;
const Icon = styled.div.attrs(props => ({
	className: 'iconfont',
}))`
	font-size: 15px;
	position: absolute;
	top: 2px;
	right: 2px;
	font-size: 15px;
	cursor: pointer;
	z-index: 30;
	color: #000;
`;
const EditText = styled.div`
	padding: 0 5px;
	line-height: 1.5;
`;
const H100 = styled.div`
	height:100%;
`
const PreviewImg = styled.div`

`
const PreviewRadio = styled.div`

`
const PreviewText = styled.div`

`
export const generateFlowDOM = ({flowLayout, current, removeItem, showPopup}) => {
	current = current || {};

	return flowLayout.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
					onClick={item.config.popup?showPopup:()=>{}}
					style={{top:item.position.y,left:item.position.x}}
				>
					<Icon
						onClick={() => {
							removeItem(item.id);
						}}
					>
						&#xe60a;
					</Icon>
					<PreviewImg>
						<img src={item.config.url} />
					</PreviewImg>
				</div>
			);
		} else if (item.config.type == 'text') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
					onClick={item.config.popup?showPopup:()=>{}}
				>
					<Icon
						onClick={() => {
							removeItem(item.id);
						}}
					>
						&#xe60a;
					</Icon>
					<PreviewText>
						{item.config.text}
					</PreviewText>
				</div>
			);
		} else if (item.config.type == 'radio') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
				>
					<Icon
						onClick={() => {
							removeItem(item.id);
						}}
					>
						&#xe60a;
					</Icon>
					<PreviewRadio>
						<Mt10>{item.config.title}</Mt10>
						<div>
							{item.config.list.map((v, i) => (
								<Label style={{ width: `${100 / item.config.layoutType}%` }} key={i}>
									<input type="radio" name={`label${item.id}`} id={`label${item.id}`} />
									<span>{v.label}</span>
								</Label>
							))}
						</div>
					</PreviewRadio>
				</div>
			);
		} else if (item.config.type == 'chat') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<Icon
						onClick={() => {
							removeItem(item.id);
						}}
					>
						&#xe60a;
					</Icon>
					<ChatDialog data={item.config.data}></ChatDialog>;
				</div>
			);
		}
	});
};

export const generateFreedomDOM = ({ config, type, blur, showPopup }) => {
	if (!config) return null;
	if (config.type == 'img') {
		return (
			<H100>
				<PreviewImg>
					<img src={config.url} onClick={config.popup?showPopup:()=>{}} />
				</PreviewImg>
			</H100>
		);
	} else if (config.type == 'text') {
		return (
			<H100>
				<PreviewText>
					<EditText
						contentEditable={type === 'preview' ? false : true}
						suppressContentEditableWarning={true}
						onBlur={blur}
						dangerouslySetInnerHTML={{ __html: config.text }}
						onClick={config.popup?showPopup:()=>{}}
					></EditText>
				</PreviewText>
			</H100>
		);
	} else if (config.type == 'radio') {
		return (
			<H100 style={{padding:'0 10px'}}>
				<PreviewRadio>
					<Mt10>{config.title}</Mt10>
					<div>
						{config.list.map((v, i) => (
							<Label style={{ width: `${100 / config.layoutType}%` }} key={i}>
								<input
									type={config.isCheckBox ? 'checkbox' : 'radio'}
									name={`label${config.i}`}
									id={`label${config.i}`}
								/>
								<span>{v.label}</span>
							</Label>
						))}
					</div>
				</PreviewRadio>
			</H100>
		);
	} else if (config.type == 'chat') {
		return <ChatDialog data={config.data}></ChatDialog>;
	}
};

export const onDrop = (e, dragType, dispatch) => {
	const type = e.dataTransfer.getData('text');
	if (type !== 'img' && type !== 'radio' && type !== 'text' && type !== 'chat') return;
	console.log(type, '类型');
	let scale = 1;
	let y = 0;
	if (dragType === 'freedom') {
		scale = 10;
		// let x = e.pageX - 470 || page.current.offsetLeft;
		y = e.pageY - 100; //  page.current.offsetTop;
	}
	const id = createUuid(6);
	const position = {
		x: 0,
		y,
		w: initData[type].w * scale,
		h: initData[type].h,
		i: id,
	};
	const payload = {
		id,
		position,
		config: initData[type].config,
		type: dragType,
	};
	dispatch({
		type: 'layoutData/add',
		payload: payload,
	});
};
