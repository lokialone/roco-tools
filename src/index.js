const React = require('react')
const reactDom = require('react-dom')
import { Nav } from '@alifd/next'
import { Switch, Route, HashRouter, Link} from 'react-router-dom'
import '@alifd/next/dist/next.css'
import TimerPage from './pages/timer'
import Record from './pages/record/index'
import { Box } from '@alifd/next'
import "./assets/index.less"

const { Item } = Nav 

function App () {
    return (<HashRouter>
        <Nav className="basic-nav" type="primary" direction="hoz"  header="hello tool" defaultSelectedKeys={['home']} triggerType="hover">
            <Item key="home"><Link to="/">Home</Link></Item> 
            <Item key="Timer"><Link to="/timer">Timer</Link></Item>
            <Item key="Record"><Link to="/record">Record</Link></Item>
        </Nav>
        <Box direction="row" align="center">
            <Switch>
                <Route path="/timer">
                    <TimerPage />
                </Route>
                <Route path="/record">
                    <Record />
                </Route>
                <Route path="/">
                    <div>xx3x</div>
                </Route>
            </Switch>
        </Box>

    </HashRouter>
    )
}
const app = document.getElementById('app')
reactDom.render(<App></App>, app)






