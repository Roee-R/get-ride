// rides filter reduser actions

// add filetrs text
export const addFromTextFilter = (text='')=>({
    type: 'FROM_FILTER_TEXT', // for case starcture in the reduces
    text // send an object data to the reducer
})

export const addToTextFilter = (text='')=>({
    type: 'TO_FILTER_TEXT', // for case starcture in the reduces
    text // send an object data to the reducer
})

// add sort functions

export const offSort = () =>({
    type: 'OFF_SORT'
})

export const sortByRidesStatus = () =>({
    type: 'SORT_BY_RIDES_STATUS'
})

export const sortByDate = () =>({
    type: 'SORT_BY_DATE'
})

export const setRouteDate = (date) => ({
    type: 'SET_ROUTE_DATE',
    date
})
