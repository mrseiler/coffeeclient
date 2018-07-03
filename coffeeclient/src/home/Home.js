import React, { Component } from 'react';
import Coffee from '../coffee/Coffee';
import CoffeeOptions from '../coffee/CoffeeOptions';

const Home = (props) => {
  return (
        <div>
            <CoffeeOptions token={props.sessionToken} firstName={props.firstName} />
        </div>
  ) 
}

export default Home;