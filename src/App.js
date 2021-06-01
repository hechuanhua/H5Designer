
import CommonDrag from "./components/common/Drag"
import Drag from "./components/drag/Drag"
import Library from "./components/library/Library"
import Setting from "./components/setting/Setting"
import { Provider } from 'react-redux'
import store from './store'
import { useEffect, useRef, useState } from 'react';

import 'antd/dist/antd.css';

const App = (props) =>{
  const [free,setFree] = useState(false)
  return(
    <Provider store={store}>
      <div className="a" onClick={()=>{setFree(!free)}}>切换模式</div>
      <div>
        <Library></Library>
        <Drag free={free}></Drag>
        <Setting></Setting>
      </div>
    </Provider>
  )
}

export default App;
