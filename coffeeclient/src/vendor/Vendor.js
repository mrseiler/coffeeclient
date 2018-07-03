import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import VendorTable from './VendorTable';
import AddVendor from './AddVendor';
import CoffeeLoading from '../coffee/CoffeeLoading';
import LoadingService from '../app/services/LoadingService';
import { Table, Button, Input } from 'reactstrap';
import Popup from 'react-popup';
import APIURL from '../helpers/environment';
import './vendor.css';

class Vendor extends Component{
    constructor(props) {
        super(props)
        this.state = {
          vendor: [],
          showPopup: false,
          loaded: false
        }
    }
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
    componentDidMount() {
        this.fetchVendor()
    }
    fetchVendor = () => {
      LoadingService.load(v => this.setState({loaded: true}))
      fetch(`${APIURL}/vendor/allvendors`, {
          method: 'GET',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.props.token
        })
    })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ vendor: logData })
        })
    }
    
    vendorDelete = (event) => {
        fetch(`${APIURL}/coffee/deletevendor`, {
          method: 'DELETE',
          body: JSON.stringify({ deletevendor: { id: event.target.id } }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
          .then((res) => this.fetchVendor()) 
      }

    render() {
        const vendor = this.state.vendor.length >= 1 ?    
        <VendorTable vendor={this.state.vendor}
        delete={this.vendorDelete} update={this.setUpdatedVendor} username={this.props.username}/> : <h2>No current vendors</h2>;

        return (
            <div className="vendor">
          <Container>
            <Row>
                <Col md="2" className="leftcolumn">
                <Button className="createvendor" onClick={this.togglePopup.bind(this)}>Become a vendor</Button>
                        {this.state.showPopup ? 
                        <AddVendor token={this.props.token} updateVendorArray={this.fetchVendor} username={this.props.username} closePopup={this.togglePopup.bind(this)} />
                        : null
                        }
                    </Col>
              <Col md="9">
              {this.state.loaded ? vendor : <CoffeeLoading />}

              </Col>
            </Row>
          </Container>
          </div>
        )
      }
}

export default Vendor;