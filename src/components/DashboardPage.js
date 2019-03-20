import React from 'react';

import AddNewRoute from './AddNewRoute';

class DashboardPage extends React.Component {

    newRoute=()=>{
        this.props.history.push('/newRoute');
    }

    render(){
        return(
            <div>
                <button onClick={this.newRoute}>Add new Route</button>
                <AddNewRoute />    
                <h2>The planned rides:</h2>
            </div>
        )
    }   
}


export default DashboardPage;
    
