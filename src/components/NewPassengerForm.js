import React from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';


export class NewPassengerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            preferredTime: '',
            numOfPassengers: '',
            address: "",
            error: ''
        }
    }
    

    handleNewPassenger = (e)=>{
        e.preventDefault();
        if ( this.state.fullName==='' || 
        this.state.preferredTime==='' || 
        this.state.numOfPassengers==='' || 
        this.state.address==='' )
        {
            this.setState(()=>({error: 'Please type passengers details'}))
        }
        else{
            const passengers= {
                userId: this.props.passengerUid,
                fullName: this.state.fullName,
                preferredTime: this.state.preferredTime,
                address: this.state.address,
                numOfPassengers: this.state.numOfPassengers
            };
            this.props.handleNewPassenger(passengers);
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
        const numOfPassengers = e.target.value;
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
            <input type="text" 
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
        passengerUid: state.auth.uid
    };
};


export default connect(mapStateToProps)
(NewPassengerForm);