 const passengersSum = (passengers)=> {
        if(!passengers)
            return 0;
        else{
            var sum = 0;
            for( var passenger in passengers ) {
                if( passengers.hasOwnProperty(passenger) ) {
                sum += parseInt( passengers[passenger].numOfPassengers );
            }
        }
        return sum;
    }
    }


    export default passengersSum;