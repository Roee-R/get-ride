
const ridesReduserDefaultState = [];

export default (state=ridesReduserDefaultState, action)=>{
    switch(action.type) {
        case 'NEW_RIDE':
            const newRide={
                createdAt: action.createdAt,
                rideId: action.rideId,
                type: 'service taxi',
                ...action.route,
                passengers: {...action.passengers},
            };
            return {...newRide};
        case 'NEW_PASSENGER':
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