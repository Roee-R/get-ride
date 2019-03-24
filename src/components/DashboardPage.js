import React from 'react';
import { connect } from 'react-redux';

import RideList from './RideList';
import AddNewRoute from './AddNewRoute';

export default class DashboardPage extends React.Component {

    newRoute=()=>{
        this.props.history.push('/newRoute');
    }

    render(){
        return(
            <div>
                <button onClick={this.newRoute}>Add new Route</button>
                <h2>The planned rides:</h2>
                <RideList />    
            </div>
        )
    }   
}

