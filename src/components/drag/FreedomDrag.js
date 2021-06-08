import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import initData from '../../config/initData';
import { throttle, createUuid } from '../../utils';

const PageDiv = styled.div`
	width: 500px;
	margin: 0 auto;
	border: 1px solid #ddd;
	height: 700px;
	position: absolute;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	top: 0;
	left: 0;
	pointer-events: none;
	&.free {
		pointer-events: auto;
		z-index: 20;
	}
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	border: 1px solid #000;
	cursor: move;
	user-select: none;
	img {
		width: 100%;
		max-height: 100%;
		user-select: none;
	}
`;
const EditorPoint = styled.div`
	position: absolute;
	background: #333;
	width: 10px;
	height: 10px;
	&.point-top {
		top: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: s-resize;
	}
	&.point-right {
		right: -5px;
		top: 50%;
		margin-top: -5px;
		cursor: e-resize;
	}
	&.point-bottom {
		bottom: -5px;
		left: 50%;
		margin-left: -5px;
		cursor: s-resize;
	}
	&.point-left {
		left: -5px;
		top: 50%;
		margin-top: -5px;
		cursor: e-resize;
	}

	&.point-top-right {
		right: -5px;
		top: -5px;
		cursor: nesw-resize;
	}
	&.point-bottom-right {
		right: -5px;
		bottom: -5px;
		cursor: nwse-resize;
	}
	&.point-bottom-left {
		bottom: -5px;
		left: -5px;
		cursor: nesw-resize;
	}
	&.point-top-left {
		top: -5px;
		left: -5px;
		cursor: nwse-resize;
	}
`;
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
const Drag = props => {
	const dispatch = useDispatch();
	const { freedomLayout, current, layoutType } = useSelector(state => {
		return state.setLibrary;
	});
	const page = useRef();
	let maxWidth = 500,
		maxHeight = 700;

	const [layout, setLayout] = useState([]);

	useEffect(() => {
		const layout = freedomLayout.map(item => item.position);
		setLayout(layout);
		console.log(freedomLayout, layout, 'freedomLayout useEffect');
	}, [freedomLayout]);

	const queryParent = target => {
		if (target.className.indexOf('drag') > -1) {
			return target;
		} else {
			target = target.parentElement;
			return queryParent(target);
		}
	};

	const down = (e, index) => {
		console.log('down');
		let className = e.target.className.replace(/(.*)point-/, '');
		let target = queryParent(e.target);
		let id = target.getAttribute('data-id');
		page.current.mouseInfo = {
			mouseDown: true,
			mouseMove: false,
			startX: e.pageX,
			startY: e.pageY,
			styleLeft: parseInt(target.style.left) || 0,
			styleTop: parseInt(target.style.top) || 0,
			styleWidth: parseInt(target.style.width) || 0,
			styleHeight: parseInt(target.style.height) || 0,
			className: className,
			index,
			id,
		};
		console.log('down', JSON.parse(JSON.stringify(page.current.mouseInfo)), id);
		dispatch({
			type: 'setLibrary/setActive',
			payload: {
				id,
			},
		});
	};
	const move = e => {
		if (!page.current || !page.current.mouseInfo || !page.current.mouseInfo.mouseDown) return;
		e.stopPropagation();
		e.preventDefault();
		const { styleWidth, styleHeight, styleTop, styleLeft, index, className, startX, startY } =
			page.current.mouseInfo;
		let moveX = e.pageX - startX;
		let moveY = e.pageY - startY;
		let top = styleTop;
		let left = styleLeft;
		let width = styleWidth;
		let height = styleHeight;
		switch (className) {
			case 'top':
				height = styleHeight - moveY;
				top = styleTop + moveY;
				break;
			case 'right':
				width = moveX + styleWidth;
				break;
			case 'bottom':
				height = moveY + styleHeight;
				break;
			case 'left':
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;
			case 'top-right':
				height = styleHeight - moveY;
				width = moveX + styleWidth;
				top = styleTop + moveY;
				break;
			case 'bottom-right':
				height = moveY + styleHeight;
				width = moveX + styleWidth;
				break;
			case 'bottom-left':
				height = moveY + styleHeight;
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;
			case 'top-left':
				height = styleHeight - moveY;
				top = styleTop + moveY;
				width = styleWidth - moveX;
				left = styleLeft + moveX;
				break;

			default:
				left = Number(styleLeft) + moveX;
				top = Number(styleTop) + moveY;
				if (width + left > maxWidth) {
					left = maxWidth - width;
				}
				if (height + top > maxHeight) {
					top = maxHeight - height;
				}
				break;
		}
		if (top < 0) top = 0;
		if (left < 0) left = 0;
		if (width + left > maxWidth) {
			width = maxWidth - left;
		}
		if (height + top > maxHeight) {
			height = maxHeight - top;
		}
		page.current.mouseInfo = {
			...page.current.mouseInfo,
			top,
			left,
			width,
			height,
			mouseMove: true,
		};
		setLayout(layout => {
			const newLayout = [
				...layout.slice(0, index),
				{ ...layout[index], x: left, y: top, w: width, h: height },
				...layout.slice(index + 1, layout.length),
			];
			return newLayout;
		});
	};

	const up = () => {
		if (
			!page.current.mouseInfo ||
			!page.current.mouseInfo.mouseDown ||
			!page.current.mouseInfo.mouseMove
		) {
			page.current.mouseInfo = null;
			return;
		}
		const { top, left, width, height, id } = page.current.mouseInfo;
		dispatch({
			type: 'setLibrary/update',
			payload: {
				id: page.current.mouseInfo.id,
				position: {
					x: left,
					y: top,
					w: width,
					h: height,
					i: id,
				},
				type: 'freedom',
			},
		});
		page.current.mouseInfo = null;
	};

	useEffect(() => {
		document.addEventListener('mousemove', e => {
			throttle(() => {
				move(e);
			}, 300)();
		});
		document.addEventListener('mouseup', up);
	}, []);

	const onDrop = e => {
		const type = e.dataTransfer.getData('text');
		console.log(type, '555');
		if (type !== 'img' && type !== 'radio' && type !== 'text') return;
		// let x = e.pageX - 470 || page.current.offsetLeft;
		let y = e.pageY - 36 || page.current.offsetTop;
		// if (initData[type].w * 10 === 500) {
		// 	x = 0;
		// }
		const id = createUuid(6);
		const position = {
			x: 0,
			y,
			w: initData[type].w * 10,
			h: initData[type].h,
			i: id,
		};
		dispatch({
			type: 'setLibrary/add',
			payload: {
				id,
				position,
				config: initData[type].config,
				type: 'freedom',
			},
		});
	};

	const removeItem = id => {
		console.log(id, layout, freedomLayout, 'iiiiiii');
		dispatch({
			type: 'setLibrary/remove',
			payload: {
				id,
				type: 'freedom',
			},
		});
	};

	const blur = e => {
		let val = e.target.innerText.replace(/\n/g, '<br/>');
		const config = {
			text: val,
		};
		dispatch({
			type: 'setLibrary/setting',
			payload: {
				config,
			},
		});
	};
	const generateDOM = (item, index) => {
		if (!item) return null;
		if (item.config.type == 'img') {
			return <img src={item.config.url} alt="" />;
		} else if (item.config.type == 'text') {
			return (
				<EditText
					contentEditable
					suppressContentEditableWarning={true}
					onBlur={blur}
					dangerouslySetInnerHTML={{ __html: item.config.text }}
				></EditText>
			);
		} else if (item.config.type == 'radio') {
			return (
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
			);
		}
	};
	// '先天性斑','老年斑','日晒斑','雀斑','产后斑','其他'
	const banList = [
		{
			data: [
				{
					name: '先天性斑',
					speech: [
						'好的亲 先天性斑点的话在咱们这边是非常常见的，就是咱们通常所说的雀斑，雀斑呈不规则形状分布的，以鼻梁、脸颊最为常见。 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
						'您今年多大年龄了呢？',
					],
				},
				{
					name: '老年斑',
					speech: [
						'好的亲，老年斑是面部的色素沉着而产生的，多为对称的蝶状分布于颧颊部、眶周、前额、上唇和鼻部，引起老年斑的原因有很多，为了更好的帮助你，老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
						'您今年多大年龄了呢？',
					],
				},
				{
					name: '日晒斑',
					speech: [
						'好的亲 日晒斑的话最直接的影响就是来自于阳光中的紫外线，鼻梁以及两边的位置会多一些，是斑点最常见的一种哦。每个人的情况不一样 为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
						'您今年多大年龄了呢？',
					],
				},
				{
					name: '雀斑',
					speech: [
						'好的亲，雀斑呢是一种浅褐色小斑点，针尖至米粒大小，常出现于前额、鼻梁和脸颊等处，偶尔也会出现于颈部、肩部、手背等，多是因为家族遗传引起的。为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
						'您今年多大年龄了呢？',
					],
				},
				{
					name: '产后斑',
					speech: [
						'好的亲 咱们通常所见到的黄褐斑、妊娠斑、蝴蝶斑等都是属于产后长斑的，一般多分布于颧骨、额头、下巴、两颊， 像咱们这边很多女性怀孕之后长斑的，都是非常常见的。每个人的情况不一样，长斑也不一样的哈，为了更好的帮助你 老师先了解一下你的情况，请认真回答老师接下来提问你的问题哦',
						'您今年多大年龄了呢？',
					],
				},
				{
					name: '其他',
					speech: ['您今年多大年龄了呢？'],
				},
			],
			width: '30%',
		},
		{
			speech: ['长斑多久了？'],
			data: [
				{
					name: '18-25岁',
				},
				{
					name: '26-33岁',
				},
				{
					name: '34-45岁',
				},
				{
					name: '46-60岁',
				},
				{
					name: '61岁以上',
				},
			],
			width: '30%',
		},
		{
			speech: ['斑,是点状 还是片状的呢 亲？'],
			data: [
				{
					name: '1年以下',
				},
				{
					name: '1-3年',
				},
				{
					name: '3-5年',
				},
				{
					name: '5年以上',
				},
			],
			width: '40%',
		},
		{
			speech: ['大概在什么部位长斑呢？'],
			data: [
				{
					name: '点状',
				},
				{
					name: '片状',
				},
			],
			width: '45%',
		},
		{
			speech: ['长斑严重不严重？'],
			data: [
				{
					name: '颧骨',
				},
				{
					name: '额头',
				},
				{
					name: '鼻翼两侧',
				},
				{
					name: '脸颊',
				},
				{
					name: '下巴',
				},
				{
					name: '其他部位',
				},
			],
			width: '30%',
		},
		{
			speech: [
				'好的，亲，经老师初步断定您的面斑是由于黑色素增多沉积而形成色斑，你现在肌肤经络基本属于一个不通透的状态，如果现在能够得到及时护理，是不难解决的，要是拖着不管它，可能就会越来越严重了！',
				'方便的话，加一下老师的微信，咱们加了好友后呢，你可以拍张照片发给我，老师了解了你现在的肌肤状态，会更具有针对性的帮你进行更深入的分析，这样才可以更好的帮助你淡化色斑 。你也可以看到老师朋友圈的一些护肤的资料和适合自己肌肤的护理方法。',
			],
			data: [
				{
					name: '严重',
				},
				{
					name: '不严重',
				},
			],
			width: '45%',
		},
		{
			speech: [
				'这是老师的微信号 （长按复制）<span class="wxh"></span>，亲可以直接到微信中添加，3分钟后老师根据你情况给您祛斑方案，并有机会帮你打造无斑肌肤呦！',
			],
			data: [
				{
					name: '添加老师微信',
				},
				{
					name: '获取祛斑方案',
				},
			],
			width: '45%',
		},
		// {
		// 	speech: ['这是老师的微信号 （长按复制）  ，亲可以直接到微信中添加，3分钟后老师根据你情况给您祛斑方案，并有机会帮你打造无斑肌肤呦！'],
		// },
	];
	
	return (
		<PageDiv
			ref={page}
			onDrop={onDrop}
			onDragOver={e => {
				e.preventDefault();
			}}
			className={layoutType == 'freedom' ? 'free' : ''}
		>
			{freedomLayout.length === layout.length
				? layout.map((item, index) => (
						<DragDiv
							className={item.i == current.id ? 'active drag' : 'drag'}
							style={{
								position: 'absolute',
								left: item.x,
								top: freedomLayout[index].config.fixed == 'bottom' ? 'initial' : item.y,
								width: item.w,
								height: item.h,
								bottom:
									freedomLayout[index].config.fixed == 'bottom'
										? freedomLayout[index].config.bottomY + 'px'
										: 'initial',
								color: freedomLayout[index].config.color,
								fontSize: freedomLayout[index].config.fontSize + 'px',
								backgroundColor: freedomLayout[index].config.backgroundColor,
								textAlign: freedomLayout[index].config.align,
							}}
							data-id={item.i}
							key={item.i}
							onMouseDown={e => {
								let className = e.target.className.replace(/(.*)point-/, '');
								console.log(className, freedomLayout[index].config.fixed, 1111);
								if (
									freedomLayout[index].config.fixed == 'bottom' &&
									(className === 'bottom' || !className)
								) {
									return;
								}
								down(e, index);
							}}
						>
							<EditorPoint className="point-top"></EditorPoint>
							<EditorPoint className="point-top-right"></EditorPoint>
							<EditorPoint className="point-right"></EditorPoint>
							<EditorPoint className="point-bottom-right"></EditorPoint>
							<EditorPoint className="point-bottom"></EditorPoint>
							<EditorPoint className="point-bottom-left"></EditorPoint>
							<EditorPoint className="point-left"></EditorPoint>
							<EditorPoint className="point-top-left"></EditorPoint>
							<Icon
								onClick={() => {
									removeItem(item.i);
								}}
							>
								&#xe60a;
							</Icon>
							{generateDOM(freedomLayout[index], index)}
						</DragDiv>
				  ))
				: ''}
		</PageDiv>
	);
};

export default Drag;
