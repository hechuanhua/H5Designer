import styled from 'styled-components';

import { LayoutConfig } from '@/typings/LayoutData'

const PreviewRadioBox = styled.div`
	height: 100%;
	padding:0 10px;
	&.template2{
		input{
			opacity:0;
			&+span{
				height:30px;
				line-height:30px;
				display: inline-block;
				width:80%;
				background:#e7e7e7;
				border-radius:5px;
				text-align:center;
			}
			&:checked{
				&+span{
					background:#1a89d0;
					color:#fff;
				}
			}
		}
	}
`;
const Mt10 = styled.div`
	margin-top: 10px;
`;
const Label = styled.label`
	display: inline-block;
	margin-top: 10px;
	input{
		margin-right:5px;
	}
`;

const PreviewRadio = (props:{config:LayoutConfig,id:number|undefined}) => {
	const { list, title, layoutType, isCheckBox, templateVal } = props.config;
  const { id } = props
	return (
		<PreviewRadioBox className={templateVal === '2'?'template2':''}>
			<Mt10>{title}</Mt10>
      <div>
        {list && list.map((v:any, i:number) => (
          <Label style={{ width: `${100 / Number(layoutType)}%` }} key={i}>
            <input type={isCheckBox?'checkbox':'radio'} name={`label${id}`} id={`label${id}`} />
            <span>{v.label}</span>
          </Label>
        ))}
      </div>
		</PreviewRadioBox>
	);
};

export default PreviewRadio
