import moment from 'moment'

// expenses filter Reduser

const ridesFillterReduserDefaultState = { // default state
    fromText: '',
    toText: '',
    sortBy: '',
    routeDate: '' // start the sort by the first of th current month (for default)
};

// CREATE expenses filter Reduser

const ridesFilterReduser = (state = ridesFillterReduserDefaultState, action)=>{ // Create expensesReduser Reducer
    switch(action.type){
        case 'FROM_FILTER_TEXT':{
            return {...state, fromText: action.text} //{...state} is new syntax for arrays "spearign object"
        }
        case 'TO_FILTER_TEXT':{
            return {...state, toText: action.text} //{...state} is new syntax for arrays "spearign object"
        }
        case 'OFF_SORT': {
            return {...state, sortBy: ''}
        }
        case 'SORT_BY_RIDES_STATUS': {
            return {...state, sortBy: 'ridesStatus'}
        }
        case 'SORT_BY_DATE': {
            return {...state, sortBy: 'date'}
        }
        case 'SET_ROUTE_DATE': {
            return {...state, routeDate: action.date}
        }
        default:{
            return state;
        }
    }
}

export default ridesFilterReduser;