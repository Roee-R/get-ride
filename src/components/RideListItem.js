import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

const RideListItem = ({passengers,
    route,startTime,endTime,createdAt}) =>{
    return (
            <Link className="list-item" to="/AddPassengerPage">
                <div>
                    <h3 className="list-item__title">Date of ride: {moment(createdAt).format('DD/MM/YYYY')}</h3>
                    <h3 className="list-item__title">Pick estimated time:{startTime}-{endTime}</h3>
                    <span className="list-item__sub-title">{route.pickLock}-{route.to}</span>
                </div>
                <h3 className="list-item__data">{passengers.length}/10 are joined the ride</h3>
            </Link>
    )
}

export default RideListItem;
