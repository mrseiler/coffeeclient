import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';
import './vendor.css';

class AddVendor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            name: '',
            coffee: '',
            price: '',
            email: '',
            vendorCreator: this.props.username
        };
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/vendor/addvendor`, {
            method: 'POST',
            body: JSON.stringify({ vendor: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        //.then((res) => res.json())
        .then((logData) => {
            this.props.updateVendorArray();
            this.setState({
                id: '',
                name: '',
                coffee: '',
                price: '',
                email: '',
                vendorCreator: this.props.username
            })
        })
        .catch(error => {
            {alert('No Bueno');}
            //this.cancelCourse();
            return Promise.reject();
        })
    }

    render() {
        return (
            <div className="popup_main">
                <div className="popup_innerpart">
                    <h3>Add a vendor</h3>
                    <hr />
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input id="name" type="text" name="name" value={this.state.name} placeholder="enter vendor name" onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="coffee">Coffee Sold</Label>
                            <Input type="text" name="coffee" id="coffee" value={this.state.coffee} onChange={this.handleChange} placeholder="enter coffee sold" required>
                            </Input> 
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input id="price" type="text" name="price" value={this.state.price} placeholder="enter price of coffee per pound" onChange={this.handleChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input id="email" type="text" name="email" value={this.state.email} placeholder="enter vendor email" onChange={this.handleChange} required/>
                        </FormGroup>
                        <Button type="submit" color="primary"> Submit </Button>
                        <Button onClick={this.props.closePopup} className="exit">x</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default AddVendor;