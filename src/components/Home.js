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
          emails: this.state.emailsCache,
          runTime: null
        });
	},

	reduceEmails() {
		let t0 = performance.now();
		let reducedEmails = [ ...new Set(this.state.emails) ];
		let t1 = performance.now();
		
		let timer = ((t1 - t0)/1000).toFixed(4);

		this.setState({
          emails: reducedEmails,
          runTime: `run time: ${timer} seconds`

        });
	},

	reduceEmailsAlt() {
		let t0 = performance.now();
		let reducedEmails = this.state.emails.reduce(function(a,b){
			if (a.indexOf(b) < 0 ) a.push(b);
			return a;
		},[]);
		let t1 = performance.now();
		
		let timer = ((t1 - t0)/1000).toFixed(4);

		this.setState({
          emails: reducedEmails,
          runTime: `run time: ${timer} seconds`
        });
	},

	render() {

		var list = [];

		for(var key in this.state.emails){
	      if(this.state.emails.hasOwnProperty(key)) {
	        list.push(<li className="emailContainer__item" key={key}>{key}. {this.state.emails[key]}</li>);
	      }
	    }

		return(
			<div>
				<div className="emailContainer left">
					<h3>Number of emails displayed: {this.state.emails.length}</h3>
		        	<ul className="scrollContainer">{list}</ul>
		        </div>
		        <div className="controlsContainer left">
		        	<h3>Remove Duplicates</h3>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmails(e)}>Reduce Method 1</a><br />
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsAlt(e)}>Reduce Method 2</a><br />
		        	<a href="#" onClick={(e) => this.resetEmails(e)}>Reset List</a>

		        	<p className="runTimer">{this.state.runTime}</p>
		        </div>
		    </div>
		)
	}
})

module.exports = Home;