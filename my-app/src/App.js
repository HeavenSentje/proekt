import React from 'react'
import NaviBar from './components/NaviBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import { Routes } from './Pages/Routes'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'



function App() {
    const routes = Routes(false)
    return (
        <>
            <Router>
                <NaviBar />
                <div className = "container">
                    {routes}
                </div>
            </Router>
        </>
    )
}

export default App
