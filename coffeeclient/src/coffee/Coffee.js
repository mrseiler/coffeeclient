import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import CoffeeTable from './CoffeeTable';
import BrewingCoffee from './BrewingCoffee';
import CoffeeEdit from './CoffeeEdit';
import CoffeeLoading from './CoffeeLoading';
import LoadingService from '../app/services/LoadingService';
import { Table, Button, Input } from 'reactstrap';
import APIURL from '../helpers/environment';
import Popup from 'react-popup';

class Coffee extends Component{
    constructor(props) {
        super(props)
        this.state = {
          coffee: [],
          showPopup: false,
          updatePressed: false,
          coffeeToUpdate: {},
          searchName: '',
          singleCoffee: [],
          isSearch: false,
          loaded: false
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    componentDidMount() {
        this.fetchCoffee()
    }
    fetchCoffee = () => {
        LoadingService.load(v => this.setState({loaded: true}))
        fetch(`${APIURL}/coffee/allcoffee`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
        })
    })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ coffee: logData })
            
        })
    }
    
    coffeeDelete = (event, coffee) => {
        fetch(`${APIURL}/coffee/delete/${coffee.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ coffee: { id: event.target.id } }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
          .then((res) => {
              this.fetchCoffee();
          })
      }
      
      coffeeUpdate = (event, coffee) => { 
        fetch(`${APIURL}/coffee/update/${coffee.id}`, {
            method: 'PUT', 
            body: JSON.stringify({ coffee: coffee }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token 
            })
        })
            .then((res) => {
                this.setState({ updatePressed: false })
                this.fetchCoffee();
            })
    }
    setUpdatedCoffee = (event, coffee) => {
        this.setState({
            coffeeToUpdate: coffee,
            updatePressed: true
        })
    }
    fetchSearchCoffee = () => {
        LoadingService.load(v => this.setState({loaded: true}))
        fetch(`${APIURL}/coffee/singlecoffee/${this.state.searchName}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
        })
    })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ coffee: logData })
        })
    }
    handleSearch = (event) => {
        this.setState({isSearch: true})
        this.fetchSearchCoffee();
    }

    render() {
        const coffeetable = this.state.coffee.length >= 1 ?    
        <CoffeeTable coffee={this.state.coffee}
         delete={this.coffeeDelete} update={this.setUpdatedCoffee} username={this.props.username} /> : <h2 className='brew'>No Results Found</h2>;


        return (
            <div className="coffee">
            <Container>
                <Row>
                    <Col md="3" className="leftcolumn">
                        <div className="searchstuff">
                            <Input className="bar" type="text" name="searchName" id="searchName" placeholder="Search by name" onChange={this.handleChange} />
                            <Input className="search" type="submit" value="Search" onClick={this.handleSearch}/>
                        </div>
                        <Button className="makecoffee" onClick={this.togglePopup.bind(this)}>Add your own coffee</Button>
                        <Button className="showallcoffee" onClick={this.fetchCoffee}>See all coffee</Button>
                            {this.state.showPopup ? 
                            <BrewingCoffee token={this.props.token} updateCoffeeArray={this.fetchCoffee} username={this.props.username} closePopup={this.togglePopup.bind(this)} />
                            : null
                            }
                            
                    </Col>
                <Col md="8">
                    {this.state.loaded ? coffeetable : <CoffeeLoading />}
                </Col>
                <Col md="12">  
                {
                    this.state.updatePressed ? <CoffeeEdit t={this.state.updatePressed} update={this.coffeeUpdate} coffee={this.state.coffeeToUpdate} /> 
                    : <div></div>
                }
                </Col>
                </Row>
            </Container>
            </div>
        )
      }
}

export default Coffee;