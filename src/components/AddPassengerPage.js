import React from 'react';

export default class AddPassemgerPage extends React.Component {

    render(){
        return (
            <div>
                <h1>Route details:</h1>
                <h3>{this.props.date}</h3>
                <h3>{this.props.timeStart}-{this.props.timeEnd}</h3>
                <h3>{this.props.from}-{this.props.to}</h3>
            </div>
            )
    }
}