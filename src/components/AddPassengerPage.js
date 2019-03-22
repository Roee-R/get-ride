import React from 'react';
import { connect } from 'react-redux';
import RideForm from "../components/RideForm";
import NewPassengerForm from './NewPassengerForm'
import { startAddPassengerToRide } from '../actions/rides';

export class AddPassemgerPage extends React.Component {

    state = {
        error: ''
    }

    MAX_PEOPLE = 10;

    handleNewPassenger = (passenger)=>{
        alert(`${this.props.numOfPassengers}<=${this.MAX_PEOPLE}`)
        if(this.props.numOfPassengers<=this.MAX_PEOPLE){
            const routeId=this.props.requestedRide.id;
            this.props.startAddPassengerToRide(routeId,passenger);
            this.props.history.push('/');     
        }
        else{
            this.setState(()=>({error: 'Ride are full'}));
        }
    }

    render(){
        return (
            <div>
                <h1>{this.state.error.length>0&&this.state.error}</h1>
                <h1>Route details:</h1>
                <RideForm 
                requestedRide= {this.props.requestedRide}
                addPassengerPage={true}
                />
                <NewPassengerForm 
                handleNewPassenger={this.handleNewPassenger}
                />
                </div>
            )
    }
}

const mapStateToProps = (state,props)=>{
    const requestedRide = state.rides.find(
        (ride)=>ride.id===props.match.params.id)
    return {
        requestedRide: requestedRide,
        numOfPassengers: state.rides[state.rides.indexOf(requestedRide)].passengers.length
    }
}

const mapDispatchToProps = (dispatch)=>({ // function that transfer dispatch to components
    startAddPassengerToRide: (routeId,passenger)=>dispatch(startAddPassengerToRide(routeId,passenger)) // use abtract dispatch to use on the web and on the tests
})

export default connect(mapStateToProps,mapDispatchToProps)
(AddPassemgerPage);