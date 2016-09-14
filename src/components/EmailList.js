import React from 'react';

let EmailList = React.createClass({
	render() {
		let list = [];

		for(let key in this.props.emailsItems){
			let index = parseInt(key) + 1;
	      	if(this.props.emailsItems.hasOwnProperty(key)) {
	        	list.push(<li className="emailContainer__item" key={key}>{index}. {this.props.emailsItems[key]}</li>);
	      	}
	    }

		return (
			<div className="emailContainer left">
				<h3>Number of emails displayed: {this.props.emailsItems.length}</h3>
				<ul className="scrollContainer">{list}</ul>
			</div>
		)
	}
});

module.exports = EmailList;