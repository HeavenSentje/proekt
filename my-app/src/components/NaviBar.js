import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navibar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand> Mordor </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link><Link to="About">About</Link></Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <Button variant="primary">Log In</Button>
                        <Button variant="primary">Sign Out</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navibar