import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';

class BrewingCoffee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            name: '',
            beanType: '',
            roast: '',
            amount: '',
            addedBy: this.props.username
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/coffee/addcoffee`, {
            method: 'POST',
            body: JSON.stringify({ coffee: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        //.then((res) => res.json())
        .then((logData) => {
            this.props.updateCoffeeArray();
            //{alert('Coffee Successfully Brewed');}
            this.setState({
                id: '',
                name: '',
                beanType: '',
                roast: '',
                amount: '',
                addedBy: this.props.username
            })
        })
    }

    render() {
        return (
            <div className="popup">
                <div className="popup_inner">
                    <h3>Add your own coffee</h3>
                    <hr />
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" type="text" name="name" value={this.state.name} placeholder="enter coffee name" onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="beanType">Bean Type</Label>
                            <Input id="beanType" type="text" name="beanType" value={this.state.beanType} placeholder="enter bean type" onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="roast">Roast</Label>
                            <Input type="select" name="roast" id="roast" value={this.state.roast} onChange={this.handleChange} placeholder="Type" required>
                                <option value={this.state.roast}>{this.state.roast}</option>
                                <option value="Light">Light</option>
                                <option value="Medium">Medium</option>
                                <option value="Dark">Dark</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="amount">Amount</Label>
                            <Input id="amount" type="text" name="amount" value={this.state.amount} placeholder="enter amount" onChange={this.handleChange} required/>
                        </FormGroup>
                        <Button type="submit" color="primary" > Submit </Button>
                        <Button onClick={this.props.closePopup} className="exit">x</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default BrewingCoffee;