import Chat from '../library/Chat'
import styled from 'styled-components';

const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
`;
const Icon = styled.div.attrs(props => ({
  className: 'iconfont'
}))`
  font-size:15px;
  position: absolute;
  top: 2px;
  right: 2px;
  font-size: 15px;
  cursor: pointer;
  z-index: 30;
`
export const generateFlowDOM = (data,current) => {
	current = current || {}
	return data.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					
					<Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
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
					<Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
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
					<Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
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
		} else if(item.config.type == 'chat'){
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<Icon onClick={()=>{removeItem(item.id)}}>&#xe60a;</Icon>
					<Chat></Chat>
				</div>
			)
		}
	});
};

const generateFreedomDOM = (item, index) => {
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
	} else if(item.config.type == 'chat'){
		return <Chat></Chat>
	}
};



const generateFlowDOM1 = () => {
	return layoutData.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
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
		} else if(item.config.type == 'chat'){
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<Chat></Chat>
				</div>
			)
		}
	});
};

const generateFreedomDOM1 = (item, index) => {
	if (!item) return null;
	if (item.config.type == 'img') {
		return <img src={item.config.url} alt="" />;
	} else if (item.config.type == 'text') {
		return <>{item.config.text}</>;
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
	} else if(item.config.type == 'chat'){
		return (
			<div
				key={item.id}
				data-grid={item.position}
				className={item.id === current.id ? 'active' : ''}
			>
				<Chat></Chat>
			</div>
		)
	}
};