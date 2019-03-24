import React from 'react';
import { connect } from 'react-redux'; // import the connect the method of react-redux
import { SingleDatePicker } from 'react-dates';

import {
    addFromTextFilter,
    addToTextFilter,
    sortByRidesStatus,
    sortByDate,
    setRouteDate,
    offSort
} 

from '../actions/filters';

export class RideListFilter extends React.Component {
    state = {
        calenderFucused: null
    }

    onDateChange = ( date )=>{
        return this.props.setRouteDate(date);
    }

    onFromTextChange = (e)=>{
        return this.props.addFromTextFilter(e.target.value)
    };

    onToTextChange = (e)=>{
        return this.props.addToTextFilter(e.target.value)
    };

    onSortChange = (e)=>{
        if(e.target.value==='ridesStatus')
            return this.props.sortByRidesStatus();
        else if (e.target.value===''){
            return this.props.offSort();
        }    
        return this.props.sortByDate();
    }

    
    render(){
        return ( // Component that connect to the store
            <div className="content-container">
                <div className="input-group">
                    <div className="input-group__item">
                        <input type="text" Value={this.props.filters.text}
                        className="text-input"
                        placeholder="Search by Pickup Location"
                        onChange={this.onFromTextChange}/>    
                    </div>
                    <div className="input-group__item">
                        <input type="text" Value={this.props.filters.text}
                        className="text-input"
                        placeholder="Search by destination"
                        onChange={this.onToTextChange}/>    
                    </div>
                    <div className="input-group__item">
                        <select value={this.props.filters.sortBy}
                        className="select"
                        onChange={this.onSortChange}>
                        <option value="">Sort By</option>    
                        <option value="date">Date</option>
                        <option value="ridesStatus">Availble rides</option>    
                        </select>
                    </div>    
                    <div className="input-group__item">
                        <SingleDatePicker
                        date={this.props.filters.routeDate} // momentPropTypes.momentObj or null
                        onDateChange={this.onDateChange} // PropTypes.func.isRequired
                        focused={this.state.calendarFocused} // PropTypes.bool
                        onFocusChange={({ focused }) => this.setState({ calendarFocused:focused })} // PropTypes.func.isRequired
                        numberOfMonths= {1}
                        isOutsideRange={()=>false}
                        disabled= {this.props.addPassengerPage}
                        // id="your_unique_id" // PropTypes.string.isRequired,
                        showClearDates={true}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({ // function that transfer states to components
    filters: state.filters
})

const mapDispatchToProps = (dispatch) =>({
    addFromTextFilter: (value)=>dispatch(addFromTextFilter(value)),
    addToTextFilter: (value)=>dispatch(addToTextFilter(value)),
    setRouteDate: (routeDate)=>dispatch(setRouteDate(routeDate)),
    sortByRidesStatus: ()=>dispatch(sortByRidesStatus()),
    sortByDate: ()=>dispatch(sortByDate()),
    offSort: ()=>dispatch(offSort())
})

export default connect(mapStateToProps,mapDispatchToProps)
(RideListFilter); // connect the store to the component (to update store data) and link the mapStateToProps