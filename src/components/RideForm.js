import React from 'react';
import { connect } from 'react-redux';
import {SingleDatePicker} from 'react-dates';
import moment from 'moment';
import 'react-dates/initialize';


export class RideForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            from: props.requestedRide ? props.requestedRide.route.pickLock : '',
            destination: props.requestedRide ? props.requestedRide.route.to : '',
            fullName: props.requestedRide ? props.requestedRide.creatorPassenger.fullName : '',
            startTime: props.requestedRide ? props.requestedRide.startTime : "12:00",
            endTime: props.requestedRide ? props.requestedRide.endTime : "15:00",
            createdAt: props.requestedRide ? moment(props.requestedRide.createdAt) : moment(),
            calendarFocused: false,
            error: ''
        }
    }
    

    handleNewRide = (e)=>{
        e.preventDefault();
        if(this.state.from==='' || this.state.destination==='' || 
        this.state.fullName==='' || this.state.startTime===undefined || 
        this.state.endTime===undefined){
            this.setState(()=>({error: 'Please type route details including your full name'}))
        }
        else{
            const route = {
                pickLock: this.state.from, 
                to: this.state.destination, 
                startTime:this.state.startTime,
                endTime:this.state.endTime,
                createdAt: this.state.createdAt.valueOf()
            }
            const creatorPassenger= {
                userId: this.props.passengerUid,
                fullName: this.state.fullName
            }
            const routeDetailes = {...route,creatorPassenger}
            this.props.handleNewRide(routeDetailes);
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

    onStartTimeChange = (e)=>{
        const startTime = e.target.value;
        this.setState(()=>({
            startTime
        })) 
    }

    onEndTimeChange = (e)=>{
        const endTime = e.target.value;
        this.setState(()=>({
            endTime
        })) 
    }

    render(){
        return(
            <form onSubmit={this.handleNewRide} className="form">
            {this.state.error.length>0&&<span>{this.state.error}</span>}
            <SingleDatePicker
            date={this.state.createdAt} // momentPropTypes.momentObj or null
            onDateChange={createdAt => createdAt && this.setState({ createdAt })} // PropTypes.func.isRequired
            focused={this.state.calendarFocused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ calendarFocused:focused })} // PropTypes.func.isRequired
            numberOfMonths= {1}
            isOutsideRange={()=>false}
            disabled= {this.props.addPassengerPage}
            // id="your_unique_id" // PropTypes.string.isRequired,
            />
            <input type="text" 
            placeholder="from"
            value={this.state.from}
            onChange={this.onfromChange}
            disabled= {this.props.addPassengerPage}
            />
            <input 
            type="text" 
            placeholder="destination"
            value={this.state.destination}
            onChange={this.onDestinationChange}
            disabled= {this.props.addPassengerPage}
            />
            <input 
            type={!this.props.addPassengerPage ? "text" : "hidden"}
            placeholder="full name"
            value={this.state.fullName}
            onChange={this.onfullNameChange}

            />
            <input 
            type="time" 
            placeholder="Start time"
            value={this.state.startTime}
            step="3600"
            onChange={this.onStartTimeChange}
            disabled= {this.props.addPassengerPage}
            />
            <input 
            type="time" 
            placeholder="End time"
            value={this.state.endTime}
            step="3600"
            onChange={this.onEndTimeChange}
            disabled= {this.props.addPassengerPage}
            />
            {this.props.addPassengerPage===false && <button className="button">Choose</button>}
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
(RideForm);