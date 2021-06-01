
import { useEffect, useRef, useState } from 'react';
import CommonDrag from "./components/common/Drag"
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import Setting from "./components/setting/Setting"
import { Provider } from 'react-redux'
import styled from "styled-components";
import store from './store'

import { Tabs, Radio } from 'antd';

import 'antd/dist/antd.css';

const Tc = styled.div`
	text-align:center
`;

const App = (props) => {
  const [free, setFree] = useState(false)
  const onChange = (e) => {
    setFree(e.target.value)
  }
  return (
    <Provider store={store}>
      <Tc>
        <Radio.Group defaultValue={false} onChange={onChange} style={{ marginBottom: 16 }}>
          <Radio.Button value={false}>流动布局</Radio.Button>
          <Radio.Button value={true}>嵌套布局</Radio.Button>
        </Radio.Group>
      </Tc>
      <div>
        <Library></Library>
        <Drag free={free}></Drag>
        <Setting></Setting>
      </div>
    </Provider>
  )
}

export default App;
