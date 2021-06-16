import styled from 'styled-components';

const PreviewRadioBox = styled.div`
	height: 100%;
	padding:0 10px;
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

const PreviewRadio = props => {
	const { list, title, layoutType, isCheckBox } = props.config;
  const { id } = props
	return (
		<PreviewRadioBox>
			<Mt10>{title}</Mt10>
      <div>
        {list.map((v, i) => (
          <Label style={{ width: `${100 / layoutType}%` }} key={i}>
            <input type={isCheckBox?'checkbox':'radio'} name={`label${id}`} id={`label${id}`} />
            <span>{v.label}</span>
          </Label>
        ))}
      </div>
		</PreviewRadioBox>
	);
};

export default PreviewRadio
