import React from 'react';
import { connect } from 'react-redux';

import RideListItem from './RideListItem'; // Return item from the list

export const RideList = (props) =>(
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Rides</div>
            <div className="show-for-desktop">Route</div>
            <div className="show-for-desktop">Number of passengers</div>
        </div>
        <div className="list-body">
            {props.rides.length>0 
                ? (props.rides.map((ride)=>{
                    return (<RideListItem key={ride.id} 
                    {...ride}
                    />)
                }))
                : (<div className="list-item list-item--message">
                    <span>No Rides</span>
                </div>)
            }
        </div>
        
    </div>
)
const mapStateToProps = (state) =>{
    return {
        rides: state.rides
    };
};

export default connect(mapStateToProps)(RideList);