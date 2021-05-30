import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Drag from "./components/common/Drag"
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
        <Drag></Drag>
        <Setting></Setting>
      </AppWrap>
    </Provider>
  )
}

export default App;
