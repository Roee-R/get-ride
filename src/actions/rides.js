import uuid from 'uuid'; // generate id
import database from '../firebase/firebase'; // import database


export const addRide = ({ route, passengers,rideId,createdAt })=>
{
    return  {
    type: 'NEW_RIDE',
    passengers,
    rideId,
    route,
    createdAt
    }
}

export const startAddRide = (routeDetailesData = {}) =>{
    return (dispatch, getState)=>{
        const rideId = uuid();
        const {
            pickLock='',
            to='',
            createdAt=0,
            passengers=[{}]
        } = routeDetailesData;
        const routeDetailes = {pickLock,to,passengers,createdAt}
        return database.ref(`rides`).push(routeDetailes).then((ref)=>{ // the return is for chaning promises
            dispatch(addRide({
                createdAt: routeDetailes.createdAt,
                route: {pickLock,to},
                passengers: routeDetailes.passengers,
                rideId
            }));
        });
    };
};

export const addPassengerToRide = (rideId, passenger) =>({
    type: 'NEW_PASSENGER',
    rideId,
    passenger
});