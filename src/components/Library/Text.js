import styled from 'styled-components';
import PreImage from '../Common/PreImage';

const PreviewTextBox = styled.div`
	height: 100%;
`;
const EditText = styled.div`
	padding: 0 5px;
	line-height: 1.5;
`;

const PreviewText = props => {
  const { blur, showPopup, type } = props
	const { text, popup, popupType } = props.config;
	return (
		<PreviewTextBox onClick={popup ? ()=>{showPopup(popupType)} : () => {}}>
			<EditText
				contentEditable={type === 'preview' ? false : true}
				suppressContentEditableWarning={true}
				onBlur={type !== 'preview'?blur:()=>{}}
				dangerouslySetInnerHTML={{ __html: text }}
			></EditText>
		</PreviewTextBox>
	);
};

export default PreviewText;
