import React from 'react';
import { Table, Button } from 'reactstrap';

const VendorTable = (props) => { 
    return (
        <div className="vendortable">
            <h3>Vendors</h3>
            <hr />
            
                {
                
                    props.vendor.map((vendor, id) => { 
                        for(let i =0; i < props.vendor.length; i++){
                        return (
                            <div className="individualvendor">
                            <div key={id}>

                                <h3 className="vendorname">{vendor.name}</h3>
                                <br />
                                <div className="vendorinfo">
                                <img src={require('../assets/vendorimage.jpg')} />
                                <p><b>Coffee Sold: </b> {vendor.coffee} </p>
                                <p><b>Price / Pound: </b> {vendor.price} </p>
                                <p><b>Email: </b>{vendor.email} </p>
                                <p><b>Creator: </b>{vendor.vendorCreator} </p>
                                </div>
                                <h4>Contact Us</h4>
                            </div>
                            </div>
                        )
                    }})
                }
                

        </div>
    );
}

export default VendorTable;