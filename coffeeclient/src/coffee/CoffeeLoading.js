import React, { Component } from 'react';
import './coffeeloading.css';

const CoffeeLoading = (props) => {
    return(
        <div className="loadingarea">
            <h3>Brewing Coffee</h3>
            <div className="coffeeloader">
            </div>
        </div>
    )
}
export default CoffeeLoading;