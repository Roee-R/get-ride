import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';

import passengersSum from '../logic/passengerSum';

export class NewPassengerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            preferredTime: '',
            numOfPassengers: 0,
            address: "",
            error: ''
        }
        this.MAX_PEOPLE = 10;
    }
    

    handleNewPassenger = (e)=>{
        e.preventDefault();
        const newPassengerSum = this.props.numOfRidePassengers+parseInt(this.state.numOfPassengers);
        if ( this.state.fullName==='' || 
        this.state.preferredTime==='' || 
        this.state.numOfPassengers===0 || 
        this.state.address==='' )
        {
            this.setState(()=>({error: 'Please type passengers details'}))
        }
        else if (this.MAX_PEOPLE<newPassengerSum){
            this.setState(()=>({
                error: `There is only ${this.MAX_PEOPLE-this.props.numOfRidePassengers} seats left`
            }));        }
        else if (this.props.numOfRidePassengers>this.MAX_PEOPLE){
            this.setState(()=>({error: 'Ride are full'}));
        }
        else{
            const passenger= {
                userId: this.props.passengerUid,
                fullName: this.state.fullName,
                preferredTime: this.state.preferredTime,
                address: this.state.address,
                numOfPassengers: this.state.numOfPassengers
            };
            this.setState(()=>({error: ''}));
            this.props.handleNewPassenger(passenger);
        }
    }

    onfullNameChange = (e)=>{
        const fullName = e.target.value;
        this.setState(()=>({
            fullName
        }))
    }

    onPreferredTimeChange = (e)=>{
        const preferredTime = e.target.value;
        this.setState(()=>({
            preferredTime
        }))
    }

    onNumOfPassengersChange = (e) =>{
        const numOfPassengers = parseInt(e.target.value);
        this.setState(()=>({
            numOfPassengers
        })) 
    }

    onAddressChange = (e)=>{
        const address = e.target.value;
        this.setState(()=>({
            address
        })) 
    }

    render(){
        return(
            <form onSubmit={this.handleNewPassenger} className="form">
            {this.state.error.length>0&&<span>{this.state.error}</span>}
            <input type="text" autoFocus 
            placeholder="Full name"
            value={this.state.fullName}
            onChange={this.onfullNameChange}
            />
            <input 
            type="number" 
            placeholder="Number of passengers"
            value={this.state.numOfPassengers}
            onChange={this.onNumOfPassengersChange}
            />
            <input 
            type= "text" 
            placeholder="address"
            value={this.state.address}
            onChange={this.onAddressChange}

            />
            <input 
            type="time" 
            placeholder="Preferd time"
            value={this.state.preferredTime}
            step="3600"
            onChange={this.onPreferredTimeChange}
            />
            <button className="button">Add</button>
            </form>
        )
    }
}

const mapStateToProps = (state, props) =>{
    return {
        passengerUid: state.auth.uid,
        numOfRidePassengers: props.requestedRide ? passengersSum(props.requestedRide.passengers) : 0
    };
};


export default connect(mapStateToProps)
(NewPassengerForm);