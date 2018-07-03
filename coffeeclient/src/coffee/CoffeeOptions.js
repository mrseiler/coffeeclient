import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Coffee from './Coffee';
import './coffee.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class CoffeeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageState: false
        }
    }
    render(){
    return (
        <div className="welcome-container">
        <Container>
        <Row>
            <Col md="2">
            </Col>
            <Col md="8" className="welcome">
                <br />
                <h1>Welcome {this.props.firstName}!</h1>
                <hr />
                <div className="welcomemessage">
                    <p><b>Wired to Succeed</b> is a great place to find and share new and exciting different types of coffee!
                        We also offer ways to find vendors to buy your favorite coffee from!
                    </p>
                </div>
            </Col>
        </Row>
        <Row className="pictures">
            <Col md="1"></Col>
            <Col md="4" className="byname">
                <br />
                <a href='/coffee'>Check out our coffee</a>
                <img src={require('../assets/coffeecup.jpeg')} />
            </Col>
            <Col md="2"></Col>
            <Col md="4" className="byvendor">
                <br />
                <a href='/vendor'>Check out the vendors</a>
                <img src={require('../assets/coffeebeans.jpg')} />
            </Col>
        </Row>
        </Container>
        </div>
    )
}
    
}
export default CoffeeOptions;
