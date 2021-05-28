import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Drag1 from "./components/drag/Drag1"
import Library from "./components/library/Library"
import Setting from "./components/setting/Setting"
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/antd.css';
const AppWrap = styled.div`
`
// const Setting = styled.div`
// flex:1
// `

const App = (props) =>{
  return(
    <Provider store={store}>
      <AppWrap>
        <Library></Library>
        <Drag1></Drag1>
        <Setting></Setting>
      </AppWrap>
    </Provider>
  )
}

export default App;
