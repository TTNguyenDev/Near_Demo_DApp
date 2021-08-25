import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'

import Home from './Components/Home';
import Declaration from './Components/Declaration';
import Donation from './Components/Donation';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import {
    Container, 
    Navbar,
    Nav,
    Row, 
    Col,
} from 'react-bootstrap';

import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href='/'>
                    VN-Covid
                </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto"></Nav>
                <Nav>
                    <Nav.Link href='/Declaration'>Declaration</Nav.Link>
                    <Nav.Link href='/Donation'>Donation</Nav.Link>
                    <Nav.Link onClick={window.accountId === '' ? login : logout}>{window.accountId === '' ? 'Login' : window.accountId}</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>

            <Switch>
                <Route exact path='/'>
                    <Home/> 
                </Route>   
                <Route exact path='/Declaration'>
                    <Declaration/>
                </Route>    
                <Route exact path='/Donation'>
                    <Donation/>
                </Route>
            </Switch>
        </Router>
    ); 
}
