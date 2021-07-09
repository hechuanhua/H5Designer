import styled from 'styled-components';
import Iconfont from 'components/Common/Iconfont'

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
			<Iconfont style={{'fontSize':'15px'}}>&#xe60a;</Iconfont>
		</RemoveIconBox>
	);
};


export default RemoveIcon
