import moment from 'moment'
import passengerSum from '../logic/passengerSum';

// sort and filter function
const getVisibleRide = (rides,{fromText, toText, sortBy, routeDate})=>{ // destructuring
    const MAX_PEOPLE = 10;
    return rides.filter((ride)=>{ // filter return just values with number bitween start date andend date
            let rideNotFull = true;
            const momentCreatedAt= moment(ride.createdAt)
            const startDateMatch=routeDate?routeDate.isSame(momentCreatedAt, 'day'):true
            const fromTextMatch = ride.route.pickLock.toLowerCase().includes(fromText.toLowerCase()); 
            const toTextMatch = ride.route.to.toLowerCase().includes(toText.toLowerCase()); 
            if(sortBy.toLowerCase()==='ridesStatus'.toLowerCase()){
                rideNotFull = passengerSum(ride.passengers)<MAX_PEOPLE;
            }
            return startDateMatch && fromTextMatch && toTextMatch && rideNotFull;
        }).sort((a,b)=>{ // sorting by reide status or by date
            if(sortBy.toLowerCase()==='ridesStatus'.toLowerCase()){
                const numOfPassengersA = passengerSum(a.passengers);
                const numOfPassengersB = passengerSum(b.passengers);    
                return numOfPassengersB-numOfPassengersA
            }
            else if(sortBy.toLowerCase()==='date'){
                return b.createdAt-a.createdAt; 
            }   
            
        })  
}

export default getVisibleRide;