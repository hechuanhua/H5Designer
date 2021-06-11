import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from '../library/Chat';
import { createUuid } from '../../utils/index';
import initData from '../../config/initData';
import styled from 'styled-components';
import WechatPopup from '../library/WechatPopup';

const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
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
`;
const EditText = styled.div`
	padding: 5px;
	line-height: 1.5;
`;
const H100 = styled.div`
	height:100%;
`

export const generateFlowDOM = (data, current, removeItem) => {
	current = current || {};

	return data.map((item, index) => {
		if (item.config.type == 'img') {
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
					<img src={item.config.url} />
				</div>
			);
		} else if (item.config.type == 'text') {
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
					{item.config.text}
				</div>
			);
		} else if (item.config.type == 'radio') {
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
					<div className="preview radio">
						<Mt10>{item.config.title}</Mt10>
						<div>
							{item.config.list.map((v, i) => (
								<Label style={{ width: `${100 / item.config.layoutType}%` }} key={i}>
									<input type="radio" name={`label${item.id}`} id={`label${item.id}`} />
									<span>{v.label}</span>
								</Label>
							))}
						</div>
					</div>
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
					<Chat data={item.config.data}></Chat>;
				</div>
			);
		}
	});
};

export const generateFreedomDOM = ({ config, type, blur, setPopup }) => {
	if (!config) return null;
	if (config.type == 'img') {
		return (
			<H100>
				<img src={config.url} onClick={config.popup?setPopup:()=>{}} />
			</H100>
		);
	} else if (config.type == 'text') {
		return (
			<H100>
				<EditText
					contentEditable={type === 'preview' ? false : true}
					suppressContentEditableWarning={true}
					onBlur={blur}
					dangerouslySetInnerHTML={{ __html: config.text }}
					onClick={config.popup?setPopup:()=>{}}
				></EditText>
			</H100>
		);
	} else if (config.type == 'radio') {
		return (
			<H100>
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
			</H100>
		);
	} else if (config.type == 'chat') {
		return <Chat data={config.data}></Chat>;
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
		type: 'setLibrary/add',
		payload: payload,
	});
};
