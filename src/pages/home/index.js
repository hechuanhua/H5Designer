
import { useEffect, useRef, useState } from 'react';
import CommonDrag from "../../components/common/Drag"
import Drag from "../../components/drag/Drag"
import Library from "../../components/library/Library"
import Setting from "../../components/setting/Setting"
import styled from "styled-components";

import { Tabs, Radio, Button } from 'antd';


const Header = styled.div`
	text-align:center;
  position: fixed;
  top: 0;
  left:0;
  right:0;
  z-index:100;
`;
const Container = styled.div`
  top: 60px;
  width: 100%;
  margin-top:100px;
`;
const Operation = styled.div`
  display:flex;
  justify-content: flex-end;
  padding-right: 100px;
  background: #fff;
  padding: 10px 100px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  button{
    margin-left:15px;
  }
`
const Center = styled.div`
  position:absolute;
  left:50%;
  transform: translateX(-50%);
`
const Home = (props) => {
  const [free, setFree] = useState(false)
  const onChange = (e) => {
    setFree(e.target.value)
  }
  return (
    <>
      <Header>
        <Operation>
          <Center>
            <Radio.Group defaultValue={false} onChange={onChange} style={{ marginBottom: 16 }}>
              <Radio.Button value={false}>流动布局</Radio.Button>
              <Radio.Button value={true}>嵌套布局</Radio.Button>
            </Radio.Group>
          </Center>
          <Button type="primary">预览</Button>
          <Button>保存</Button>
          <Button>发布</Button>
        </Operation>
      </Header>
      <Container>
        <Library></Library>
        <Drag free={free}></Drag>
        <Setting></Setting>
      </Container>
    </>
  )
}

export default Home;
