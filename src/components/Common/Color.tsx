import { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color'
import styled from 'styled-components'

const Swatch = styled.div`
  padding: 5px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0,0,0,.1);
  display: inline-block;
  cursor: pointer;
`
const Popover = styled.div`
  position: absolute;
  z-index: 2;
`
const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`
const ColorDiv = styled.div`
  width: 36px;
  height: 14px;
  border-radius: 2px;
`
// export type ColorConfigType = string;

interface ColorProps {
  color: string;
  onChange: (v: string) => void;
}

const Color = (props: ColorProps) => {
  const { color, onChange } = props
  const [displayColorPicker, setDisplayColorPicker] = useState(false)
  const [colorValue, setColorValue] = useState(color)
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleClose = () => {
    setDisplayColorPicker(false)
  };

  const handleChange = (color: ColorResult) => {
    setColorValue(color.hex)
    onChange(color.hex)
  };

  return (
    <div>
      <Swatch onClick={handleClick}>
        <ColorDiv style={{ backgroundColor: colorValue }}></ColorDiv>
      </Swatch>
      {displayColorPicker ? <Popover>
        <Cover onClick={handleClose} />
        <SketchPicker color={colorValue} onChange={handleChange} />
      </Popover> : null}
    </div>
  )
}

export default Color