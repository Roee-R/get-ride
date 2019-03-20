
const ridesReduserDefaultState = [];

export default (state=ridesReduserDefaultState, action)=>{
    switch(action.type) {
        case 'SET_RIDES':{
            return action.rides
        }
        case 'NEW_RIDE':{
            const newRide={
                ...action.newRoute,
                type: 'service taxi'
            };
            return {...newRide};}
        case 'NEW_PASSENGER':{
            state.map((ride)=>{
                if(ride.rideId===action.rideId){
                    if(ride.passengers.length<11){
                        ride.passenger.push(action.passenger);
                        return [...state, ride];}
                    else
                        return ride;     
                }
                else{
                    return ride
                }
            })
        }
        default: 
            return state
    }
}

// rides = [{
//     ride: rideId,
//     type: servise taxi/bus
//     from: 'city',
//     to: 'city'
//     passengers: [
//         {
//             userId,
//             fullName,
//             address
//         }
//     ],
//     date: datestamp,
//     time: timestamp
// }]