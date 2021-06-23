import styled from 'styled-components';
import PreImage from '../Common/PreImage';

const PreviewImgBox = styled.div`
	height: 100%;
`;

const PreviewImage = props => {
	const { url, popup, popupType } = props.config;
  const { showPopup } = props
	return (
		<PreviewImgBox onClick={popup ? ()=>{showPopup(popupType)} : () => {}}>
			<PreImage src={url} />
		</PreviewImgBox>
	);
};

export default PreviewImage
