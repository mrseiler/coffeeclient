import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import APIURL from '../helpers/environment';
import './signup.css';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '', 
            password: ''
        };
    }
    cancelCourse = () => { 
        document.getElementById("create-course-form").reset();
      }

    handleChange = (event) => {
     
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (event) => {
        
        fetch(`${APIURL}/user/signup`, {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
            this.props.nameFromApp(this.state.first_name);
            this.props.lastNameFromApp(this.state.last_name);
            this.props.emailFromApp(this.state.email);
            this.props.usernameFromApp(this.state.username);
        }) 
        .catch(error => {
            {alert('Error filling out form');}
            //this.cancelCourse();
            return Promise.reject();
        })
        event.preventDefault()
    }

    render() {
        return (
            <Container className="signup-container">
                <Row>
                    <Col md="6" className="signup">
                        <div>
                            <h1>Sign Up</h1>
                            <Form onSubmit={this.handleSubmit} id="create-course-form" className="was-validated">
                                <FormGroup>
                                    <Label for="first_name">First Name</Label>
                                    <Input id="firstName" className="form-control" type="text" name="first_name" placeholder="enter first name" onChange={this.handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="last_name">Last Name</Label>
                                    <Input id="lastName" className="form-control" type="text" name="last_name" placeholder="enter last name" onChange={this.handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input id="email" type="text" className="form-control" name="email" placeholder="enter valid email" onChange={this.handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="username">Username (5-20 Characters)</Label>
                                    <Input id="username" className="custom-control-label" type="text" name="username" placeholder="enter username" onChange={this.handleChange} required/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password (6-30 characters)</Label>
                                    <Input id="su_password" type="password" className="form-control" name="password" placeholder="enter password" onChange={this.handleChange} required/>
                                </FormGroup>
                                <Button type="submit"> Submit </Button>
                                <Button className="change" onClick={this.props.changeUserStatus}>Already have an account?</Button>
                                <Button className="reset" onClick={this.cancelCourse}>Reset Form</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Signup;