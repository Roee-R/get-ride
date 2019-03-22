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
            passengers=[],
            startTime='',
            endTime='',
        } = routeDetailesData;

        const routeDetailes = {
            route:{pickLock,to},
            creatorPassengers: passengers[0],
            passengers: [],
            startTime,
            endTime,
            createdAt
        }

        const passenger = routeDetailes.creatorPassengers;
        let id= null
        return database.ref(`rides`).push(routeDetailes).then((ref)=>{ // the return is for chaning promises
            id = ref.key;
            return dispatch(addRide({id,...routeDetailes}));
        }).then(()=>{
            dispatch(startAddPassengerToRide(id,passenger));
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
                var newride = {...ride.val()};
                ridesArray.push(newride);
            });
            dispatch(setRides(ridesArray));
        })
    }
};




export const addPassengerToRide = (rideId, updateRide) =>({
    type: 'NEW_PASSENGER',
    rideId,
    updateRide
});

export const startAddPassengerToRide = (rideId, passenger) =>{
    return (dispatch, getState)=>{
        let ride = getState().rides.filter((ride)=>{
            if(ride.id===rideId)
                return ride
        })
        ride[0].passengers.push(passenger);
        return database.ref(`rides/${rideId}/passengers`).update(ride[0].passengers).then(()=>{
            dispatch(addPassengerToRide(rideId, ride[0]));
        })
    }
};