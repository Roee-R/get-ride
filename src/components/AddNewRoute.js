import React from 'react';
import { connect } from 'react-redux';

import RideFrom from '../components/RideForm';
import { startAddRide } from '../actions/rides';

export class AddNewRoute extends React.Component {


    handleNewRide = (routeDetailes)=>{
        this.props.startAddRide(routeDetailes).then(()=>{
            this.props.history.push('/');    
        });
    }

 

    render(){
        return(
            <div>
            <h1>Please choose your ride route</h1>
            <RideFrom 
            handleNewRide={this.handleNewRide}
            />
            </div>        
        )
    }

}
const mapDispatchToProps = (dispatch)=>({ // function that transfer dispatch to components
    startAddRide: (routeDetailes)=>dispatch(startAddRide(routeDetailes)) // use abtract dispatch to use on the web and on the tests
})

export default connect(undefined,mapDispatchToProps)
(AddNewRoute);