import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { startAddRide } from '../actions/rides';

export class AddNewRoute extends React.Component {

    state = {
        from: '',
        destination: '',
        fullName: '',
        error: ''
    }

    handleNewRide = (e)=>{
        e.preventDefault();
        if(this.state.description==='' || this.state.amount==='' || this.state.fullName===''){
            this.setState(()=>({error: 'Please type route details including your full name'}))
        }
        else{
            const route = {pickLock: this.state.from, to: this.state.destination}
            const passengers= [{
                userId: this.props.passengerUid,
                fullName: this.state.fullName
            }]
            const routeDetailes = {...route,passengers,createdAt:moment().valueOf()}
            this.props.startAddRide(routeDetailes);
            this.props.history.push('/dashboard');    
        }
    }

    onfromChange = (e)=>{
        const pickLoc = e.target.value;
        this.setState(()=>({
            from: pickLoc
        }))
    }

    onDestinationChange = (e)=>{
        const destination = e.target.value;
        this.setState(()=>({
            destination
        }))
    }

    onfullNameChange = (e) =>{
        const fullName = e.target.value;
        this.setState(()=>({
            fullName
        })) 
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        if (this.state.createdAt !== prevState.createdAt) {
            alert(this.state.createdAt);
        }
    }

    render(){
        return(
            <form onSubmit={this.handleNewRide} className="form">
            <h1>Please choose your ride route</h1>
            {this.state.error.length>0&&<span>{this.state.error}</span>}
            <input type="text" 
            placeholder="from"
            value={this.state.from}
            onChange={this.onfromChange}
            />
            <input 
            type="text" 
            placeholder="destination"
            value={this.state.destination}
            onChange={this.onDestinationChange}
            />
            <input 
            type="text" 
            placeholder="full name"
            value={this.state.fullName}
            onChange={this.onfullNameChange}
            />
            <button className="button">Choose</button>
            </form>
        )
    }
}

const mapStateToProps = (state, props) =>{
    return {
        passengerUid: state.auth.uid
    };
};

const mapDispatchToProps = (dispatch)=>({ // function that transfer dispatch to components
    startAddRide: (routeDetailes)=>dispatch(startAddRide(routeDetailes)) // use abtract dispatch to use on the web and on the tests
})

export default connect(mapStateToProps,mapDispatchToProps)
(AddNewRoute);