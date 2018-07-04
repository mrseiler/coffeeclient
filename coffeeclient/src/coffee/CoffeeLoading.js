import React, { Component } from 'react';
import './coffeeloading.css';

const CoffeeLoading = (props) => {
    return(
        <div className="loadingarea">
            <h3>Brewing
            <div class="loading">  
            <div class="object object_one"></div>
            <div class="object object_two"></div>
            <div class="object object_three"></div>
            </div></h3>
            
            <div className="coffeeloader">
            </div>
        </div>
    )
}
export default CoffeeLoading;