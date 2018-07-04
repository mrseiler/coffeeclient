import React from 'react';
import { Table, Button } from 'reactstrap';

const CoffeeTable = (props) => { 
    return (
        <div className="coffeetable">
            <h3>Coffee</h3>
            <hr />
                {
                    
                    props.coffee.map((coffee, id) => { 
                        for(let counter=0; counter < props.coffee.length; counter++){
                        if(props.username === coffee.addedBy){
                        return (
                            
                            <div className="individualcoffee">
                            <div key={id}>

                                <p><b>Name:</b> {coffee.name} {'\n'}
                                <b>Bean Type:</b> {coffee.beanType} {'\n'}
                                <b>Roast:</b> {coffee.roast} {'\n'}
                                <img src={require('../assets/individualcoffee.png')} />
                                <b>Amount:</b> {coffee.amount} {'\n'}
                                <b>Added By:</b> {coffee.addedBy} {'\n'}
                                </p>
                            </div>
                            <Button id={coffee.id} onClick={e => props.delete(e, coffee)} className="delete">Delete</Button>
                            <Button id={coffee.id} onClick={e => props.update(e, coffee)} className="update">Update</Button>
                            </div>
                        )
                        }
                        else {
                            return(
                                <div className="individualcoffee">
                                <div key={id}>

                                <p><b>Name:</b> {coffee.name} {'\n'}
                                <b>Bean Type:</b> {coffee.beanType} {'\n'}
                                <b>Roast:</b> {coffee.roast} {'\n'}
                                <img src={require('../assets/individualcoffee.png')} />
                                <b>Amount:</b> {coffee.amount} {'\n'}
                                <b>Added By:</b> {coffee.addedBy} {'\n'}
                                </p>
                                </div>
                                <Button className="fillerButton">a</Button>
                                </div>
                            )
                        }
                    }
                    return null;
                })
                }
        </div>
    );
}

export default CoffeeTable;