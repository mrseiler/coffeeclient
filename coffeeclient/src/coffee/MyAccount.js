import React from 'react';
import './myaccount.css';
import { Container, Row, Col, Button } from 'reactstrap';

const MyAccount = (props) => {
    return (
        <Container className="mypage">
            <Row>
                <Col md="2"></Col>
                <Col md="8">
                    <div className="myaccountpage">
                        <h1>My Account</h1>
                        <hr />
                        <div className="firstname">
                        <h3>First Name:</h3>
                        <p> &emsp;{props.firstName}&emsp;</p>
                        </div>
                        <div className="lastname">
                        <h3>Last Name:</h3>
                        <p> &emsp;{props.lastName}&emsp;</p>
                        </div>
                        <div className="email">
                        <h3>Email:</h3>
                        <p> &emsp;{props.email}&emsp;</p>
                        </div>
                        <div className="username">
                        <h3>Username:</h3>
                        <p> &emsp;{props.username}&emsp;</p>
                        </div>
                        <div className="isvendor">
                        <h3>Vendor:</h3>
                        <p> &emsp;Yes&emsp;</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
export default MyAccount;