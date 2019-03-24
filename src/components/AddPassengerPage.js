import React from 'react';
import { connect } from 'react-redux';
import RideForm from "../components/RideForm";
import NewPassengerForm from './NewPassengerForm'
import { startAddPassengerToRide } from '../actions/rides';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";


export class AddPassemgerPage extends React.Component {

    state = {
        error: '',
        routeDetailes: this.props.requestedRide || '',
    }

    MAX_PEOPLE = 10;


    handleNewPassenger = (passenger)=>{
        const routeId=this.state.routeDetailes.id;
        this.props.startAddPassengerToRide(routeId,passenger);
        this.props.history.push('/');     
    }

    render(){
        return (
            <Tabs>
                <TabList>
                    <Tab>Route Deatils</Tab>
                    <Tab>passenger Details</Tab>
                </TabList>
                <TabPanel>
                    <RideForm 
                    requestedRide= {this.props.requestedRide}
                    addPassengerPage={true}
                    /> 
                </TabPanel>
                <TabPanel>
                    <NewPassengerForm
                    requestedRide= {this.props.requestedRide} 
                    handleNewPassenger={this.handleNewPassenger}
                    />
                </TabPanel>
            </Tabs>
            )
    }
}

const mapStateToProps = (state,props)=>{
    const requestedRide = state.rides.find(
        (ride)=>ride.id===props.match.params.id)
    return {
        requestedRide: requestedRide,
    }
}

const mapDispatchToProps = (dispatch)=>({ // function that transfer dispatch to components
    startAddPassengerToRide: (routeId,passenger)=>dispatch(startAddPassengerToRide(routeId,passenger)) // use abtract dispatch to use on the web and on the tests
})

export default connect(mapStateToProps,mapDispatchToProps)
(AddPassemgerPage);