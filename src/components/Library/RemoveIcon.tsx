import styled from 'styled-components';

import { LayoutConfig } from '../../typings/LayoutData'

const RemoveIconBox = styled.div.attrs(props => ({
	className: 'iconfont removeIcon',
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

const RemoveIcon = (props: { removeItem: (id: string) => void, id: string }) => {
	const { removeItem, id } = props;
	return (
		<RemoveIconBox onClick={() => { removeItem(id) }}>
			&#xe60a;
		</RemoveIconBox>
	);
};


export default RemoveIcon
