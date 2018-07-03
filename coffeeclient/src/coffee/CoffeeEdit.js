import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class CoffeeEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            name: '',
            beanType: '',
            roast: '',
            amount: '',
        };
    }

    componentWillMount() {
        this.setState({
            id: this.props.coffee.id,
            name: this.props.coffee.name,
            beanType: this.props.coffee.beanType,
            amount: this.props.coffee.amount
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {
        return (
            <div>
                <Modal isOpen={true} >
                    <ModalHeader >Update your coffee log</ModalHeader>
                    <ModalBody>
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
                            <Input type="select" name="roast" id="roast" value={this.state.roast} onChange={this.handleChange} placeholder="Type">
                                <option>{this.props.coffee.roast}</option>
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
                    </ModalBody>

                </Modal>

            </div>
        )
    }
}

export default CoffeeEdit;