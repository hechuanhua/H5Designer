
import { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { Radio, Button } from 'antd';


const Header = styled.div`
	text-align:center;
  position: fixed;
  top: 10px;
  width: 100%;
`;

const Header = (props) => {
  const [free, setFree] = useState(false)
  const onChange = (e) => {
    setFree(e.target.value)
  }
  return (
    <Header>
      <>
        <Button type="primary">预览</Button>
        <Button type="primary">保存</Button>
        <Button type="primary">发布</Button>
      </>
      <Radio.Group defaultValue={false} onChange={onChange} style={{ marginBottom: 16 }}>
        <Radio.Button value={false}>流动布局</Radio.Button>
        <Radio.Button value={true}>嵌套布局</Radio.Button>
      </Radio.Group>
    </Header>
  )
}

export default Header;
