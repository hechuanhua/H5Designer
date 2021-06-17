
import {
  BrowserRouter as Router1,
  HashRouter  as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './home'
import Preview from './preview'

const NotFound = () => {
  return (
    <div className="a">404</div>
  )
}
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/preview" component={Preview}></Route>
        <Route path="*" component={NotFound}></Route>
      </Switch>
    </Router>
  )
}



export default Routes