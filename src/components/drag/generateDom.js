import Chat from '../library/Chat';
import styled from 'styled-components';

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
export const generateFlowDOM = (data, current) => {
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
					<img src={item.config.url} alt="" />
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
					<Chat></Chat>
				</div>
			);
		}
	});
};

export const generateFreedomDOM = (item, type) => {
	if (!item) return null;
	if (item.type == 'img') {
		return <img src={item.url} alt="" />;
	} else if (item.type == 'text') {
		return (
			<EditText
				contentEditable={type === 'preview' ? false : true}
				suppressContentEditableWarning={true}
				onBlur={blur}
				dangerouslySetInnerHTML={{ __html: item.text }}
			></EditText>
		);
	} else if (item.type == 'radio') {
		return (
			<div className="preview radio">
				<Mt10>{item.title}</Mt10>
				<div>
					{item.list.map((v, i) => (
						<Label style={{ width: `${100 / item.layoutType}%` }} key={i}>
							<input type="radio" name={`label${item.i}`} id={`label${item.i}`} />
							<span>{v.label}</span>
						</Label>
					))}
				</div>
			</div>
		);
	} else if (item.type == 'chat') {
		return <Chat></Chat>;
	}
};
