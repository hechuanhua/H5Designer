
import Drag from "./components/common/Drag"
import Library from "./components/library/Library"
import Setting from "./components/setting/Setting"
import { Provider } from 'react-redux'
import store from './store'

import 'antd/dist/antd.css';

const App = (props) =>{
  return(
    <Provider store={store}>
      <div>
        <Library></Library>
        <Drag></Drag>
        <Setting></Setting>
      </div>
    </Provider>
  )
}

export default App;
