import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

import RideForm from '../components/RideForm';
import { startAddRide } from '../actions/rides';
import NewPassengerForm from '../components/NewPassengerForm';

export class AddNewRoute extends React.Component {

    state = {
        routeDetailes: undefined,
        error: '',
        selectedIndex: 0
    }

    handleNewRide = (routeDetailes)=>{
        this.setState(()=>({
            routeDetailes: {...routeDetailes, route:{pickLock:routeDetailes.pickLock, to:routeDetailes.to}},
            error: '',
            selectedIndex: 1
            })
        
        );
    }

    handleNewPassenger = (passenger)=>{
        if(this.state.routeDetailes!==undefined){
            const routeDetailes = {...this.state.routeDetailes,...{passengers:[]}};
            routeDetailes.passengers.push(passenger);
            this.props.startAddRide(routeDetailes).then(()=>{
            this.props.history.push('/');     
            });
        }
        else{
            this.setState(()=>({error: 'You must enter route details'}))
        }
        
    }
    render(){
        return(
            <Tabs 
            selectedIndex={this.state.selectedIndex}
            onSelect={(index) => this.setState(()=>({selectedIndex: index}))}
            >
                <TabList>
                    <Tab>Route Deatils</Tab>
                    <Tab>passenger Details</Tab>
                </TabList>
            
                <TabPanel>
                    <RideForm 
                    handleNewRide={this.handleNewRide}
                    addPassengerPage={false}
                    requestedRide={
                        this.state.routeDetailes!==undefined ? 
                        this.state.routeDetailes : undefined}
                    /> 
                </TabPanel>
                <TabPanel>
                    {this.state.error.length>0 && this.state.error}
                    <NewPassengerForm 
                    handleNewPassenger={this.handleNewPassenger}
                    requestedRide= {this.state.routeDetailes} 
                    />  
                </TabPanel>
          </Tabs>
        )
    }

}



           


const mapStateToProps = (state,props)=>{
    return {
        rides: state.rides
    }
}

const mapDispatchToProps = (dispatch)=>({ // function that transfer dispatch to components
    startAddRide: (routeDetailes)=>dispatch(startAddRide(routeDetailes)) // use abtract dispatch to use on the web and on the tests
})

export default connect(mapStateToProps,mapDispatchToProps)
(AddNewRoute);