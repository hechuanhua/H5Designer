
import { useEffect, useRef, useState } from 'react';
import CommonDrag from "./components/common/Drag"
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import Setting from "./components/setting/Setting"
import { Provider } from 'react-redux'
import styled from "styled-components";
import store from './store'

import { Tabs, Radio, Button } from 'antd';

import 'antd/dist/antd.css';

const Header = styled.div`
	text-align:center;
  position: fixed;
  top: 10px;
  width: 100%;
`;
const Container = styled.div`
  top: 60px;
  width: 100%;
  margin-top:50px;
`;

const App = (props) => {
  const [free, setFree] = useState(false)
  const onChange = (e) => {
    setFree(e.target.value)
  }
  return (
    <Provider store={store}>
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
      <Container>
        <Library></Library>
        <Drag free={free}></Drag>
        <Setting></Setting>
      </Container>
    </Provider>
  )
}

export default App;
