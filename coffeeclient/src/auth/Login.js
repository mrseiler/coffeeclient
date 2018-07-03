import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import APIURL from '../helpers/environment';
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            usernameErr: ''
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    
    handleSubmit = (event) => {

        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
        }).then(
            (response) => response.json()
        )
        .then((data) => {
            this.props.setToken(data.sessionToken)
            this.props.lastNameFromApp(data.user.lastName)
            this.props.nameFromApp(data.user.firstName)
            this.props.usernameFromApp(data.user.username)
            this.props.emailFromApp(data.user.email)
        })
        .catch(error => {
            {alert('Invalid username and password');}
            return Promise.reject();
        })
        event.preventDefault()
    }
    render() {
        return (
            <Container className="login-container">
                <Row>
                    <Col md="6" className="login">
                        <div>
                            <h1>Login</h1>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input id="li_username" type="text" name="username" className="form-control" placeholder="enter username" onChange={this.handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input id="li_password" type="password" className="form-control" name="password" placeholder="enter password" onChange={this.handleChange} required />
                                </FormGroup>
                                <Button type="submit"> Submit </Button>
                                <Button className="change" onClick={this.props.changeUserStatus}>Don't have an account?</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Login;