
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
            return [...state,newRide];}
        case 'NEW_PASSENGER':{
            state.map((ride)=>{
                if(ride.id===action.rideId){
                    alert(`yeh`);
                    return [...state, action.updateRide];}
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