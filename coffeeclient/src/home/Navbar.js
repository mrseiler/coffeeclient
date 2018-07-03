import React, { Component } from 'react'; 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import './navbar.css';

class SiteBar extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div className="nav">
                <Navbar light expand="md">
                    <NavbarBrand href="/" className="navbarBrand"><img src={require('../assets/homeicon.png')} /> {this.props.username}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="navbar">
                            <NavItem className="navitems">
                                <Button href='/myaccount' className="myaccount">My Account</Button>
                                <Button href='/coffee' className="coffeebutton">Coffee</Button>
                                <Button href='/vendor' className="vendorbutton">Vendors</Button>
                                <h3 className="company">WIRED TO SUCCEED</h3>
                            </NavItem>
                            <NavItem>
                                <Button className="logout" onClick={() => this.props.clickLogout()}>Logout</Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default SiteBar;