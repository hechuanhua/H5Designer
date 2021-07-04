import styled from 'styled-components';
import PreImage from '../Common/PreImage';
import config from '../../config/config';

import { LayoutConfig } from '@/typings/LayoutData'

const PreviewImgBox = styled.div`
	height: 100%;
`;


const PreviewImage = (props:{config:LayoutConfig,showPopup:(e:any)=>void}) => {
	const { url, popup, popupType } = props.config;
  const { showPopup } = props
	return (
		<PreviewImgBox onClick={popup ? ()=>{showPopup(popupType)} : () => {}}>
			<PreImage src={`${url && url.indexOf('http')>-1?url:config.staticImg+url}`} />
		</PreviewImgBox>
	);
};

export default PreviewImage
