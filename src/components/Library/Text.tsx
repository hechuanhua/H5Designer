import styled from 'styled-components';

import { LayoutConfig } from '@/typings/LayoutData'

const PreviewTextBox = styled.div`
	height: 100%;
`;
const EditText = styled.div`
	padding: 0 5px;
	line-height: 1.5;
	outline: none;
`;

interface PreviewTextProps {
	config:LayoutConfig,
	blur:(e?:any)=>void
	showPopup:(type?:string)=>void
	type?:string
}
const PreviewText = (props:PreviewTextProps) => {
  const { blur, showPopup, type } = props
	const { text, popup, popupType } = props.config;
	return (
		<PreviewTextBox onClick={popup ? ()=>{showPopup(popupType)} : () => {}}>
			<EditText
				contentEditable={type === 'preview' ? false : true}
				suppressContentEditableWarning={true}
				onBlur={type !== 'preview'?blur:()=>{}}
				dangerouslySetInnerHTML={{ __html: text as string }}
			></EditText>
		</PreviewTextBox>
	);
};

export default PreviewText;
