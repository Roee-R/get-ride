import uuid from 'uuid'; // generate id
import database from '../firebase/firebase'; // import database


export const addRide = (newRoute)=>(
    {
        type: 'NEW_RIDE',
        newRoute
    }
)

export const startAddRide = (routeDetailesData = {}) =>{
    return (dispatch, getState)=>{
        const {
            pickLock='',
            to='',
            createdAt=0,
            passengers=[{}],
            startTime='',
            endTime='',
        } = routeDetailesData;

        const routeDetailes = {
            route:{pickLock,to},
            passengers,
            startTime,
            endTime,
            createdAt
        }

        return database.ref(`rides`).push(routeDetailes).then((ref)=>{ // the return is for chaning promises
            dispatch(addRide(routeDetailes));
        });
    };
};

export const setRides = (rides)=>({
    type: 'SET_RIDES',
    rides
});

export const startSetRides = ()=>{
    return (dispatch, getState)=>{
        return database.ref(`rides`).once('value').then((snapshot)=>{
            const ridesArray = [];
            snapshot.forEach(ride => {
                var newride = {id: ride.key, ...ride.val()};
                ridesArray.push(newride);
            });
            dispatch(setRides(ridesArray));
        })
    }
};




export const addPassengerToRide = (rideId, passenger) =>({
    type: 'NEW_PASSENGER',
    rideId,
    passenger
});