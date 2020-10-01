const React = require('react')
const path = require('path')
const reactDom = require('react-dom')
import { Nav } from '@alifd/next'
import { Switch, Route, HashRouter} from 'react-router-dom';
import '@alifd/next/dist/next.css'
import TimerPage from './pages/timer'
const utils = require('./utils/index')
const { Item } = Nav 

utils.test()
function App () {
    return (<HashRouter>
        <Nav className="basic-nav" type="primary" direction="hoz"  header="hello tool" defaultSelectedKeys={['home']} triggerType="hover">
        <Item key="home"><Link to="/">Home</Link></Item> 
        <Item key="Timer"><Link to="/Timer">Timer</Link></Item>
        </Nav>  
        <Switch>
        <Route path="/Timer">
            <TimerPage />
        </Route>
        <Route path="/">
            <div>xx3x</div>
        </Route>
        </Switch>
    </HashRouter>
    )
}
const app = document.getElementById('app')
reactDom.render(<App></App>, app)






