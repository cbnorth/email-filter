var React = require('react');
import combinedEmails from '../utils/emailgen';

let Home = React.createClass({
	getInitialState(){
		return {
			emails: [],
			emailsCache: [],
			runTime: null
		}
	},

	componentDidMount() {
		this.setState({
          emails: combinedEmails,
          emailsCache: combinedEmails
        });
	},

	resetEmails() {
		this.setState({
          emails: this.state.emailsCache
        });
	},

	reduceEmails() {
		let t0 = performance.now();
		let reducedEmails = [ ...new Set(this.state.emails) ];
		let t1 = performance.now();
		
		let foo = ((t1 - t0)/1000).toFixed(4);

		this.setState({
          emails: reducedEmails,
          runTime: foo
        });

	},

	reduceEmailsAlt() {
		let t0 = performance.now();
		let reducedEmails = this.state.emails.reduce(function(a,b){
			if (a.indexOf(b) < 0 ) a.push(b);
			return a;
		},[]);
		let t1 = performance.now();
		
		let foo = ((t1 - t0)/1000).toFixed(4);

		this.setState({
          emails: reducedEmails,
          runTime: foo
        });
	},

	render() {

		var list = [];

		for(var key in this.state.emails){
	      if(this.state.emails.hasOwnProperty(key)) {
	        list.push(<li className="detailsTable__item" key={key}>{this.state.emails[key]}</li>);
	      }
	    }

		return(
			<div>
		        <ul className="left">{list}</ul>
		        <div className="right">
		        	<p>{this.state.emails.length}</p>
		        	<a href="#" onClick={(e) => this.reduceEmails(e)}>Reduce Method1</a><br />
		        	<a href="#" onClick={(e) => this.reduceEmailsAlt(e)}>Reduce Method2</a><br />
		        	<a href="#" onClick={(e) => this.resetEmails(e)}>Reset List</a>

		        	<p>testing {this.state.runTime} this</p>
		        </div>
		    </div>
		)
	}
})

module.exports = Home;