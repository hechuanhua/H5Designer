import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import { Provider } from 'react-redux'
import store from './store'
const AppWrap = styled.div`
display:flex;
`
const Setting = styled.div`
flex:1
`

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
