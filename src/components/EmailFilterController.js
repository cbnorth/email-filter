import React from 'react';

let EmailFilterController = React.createClass({
	resetEmails() {
		let emailCache = this.props.emailCache;
		let timer = null;
		let filterHasRun = null;
		this.props.handleListUpdate(emailCache, timer, filterHasRun)
	},

	reduceEmailsES6() {
		let t0 = performance.now();
		let reducedEmails = [ ...new Set(this.props.emailList) ];
		let t1 = performance.now();
		
		let deltaT = ((t1 - t0)/1000).toFixed(4);
		let timer = `${deltaT} seconds`;

		let filterHasRun = true
		this.props.handleListUpdate(reducedEmails, timer, filterHasRun);
	},

	reduceEmailsES5() {
		let t0 = performance.now();
		let reducedEmails = this.props.emailList.reduce(function(a,b){
			if (a.indexOf(b) < 0 ) a.push(b);
			return a;
		},[]);
		let t1 = performance.now();
		
		let deltaT = ((t1 - t0)/1000).toFixed(4);
		let timer = `${deltaT} seconds`;

		let filterHasRun = true
		this.props.handleListUpdate(reducedEmails, timer, filterHasRun);
	},

	reduceEmailsNoFunction(e) {
		let t0 = performance.now();
	    var seen = {};
	    var reducedEmails = [];
	    var len = e.length;
	    var j = 0;
	    for(var i = 0; i < len; i++) {
	         var item = e[i];
	         if(seen[item] !== 1) {
	               seen[item] = 1;
	               reducedEmails[j++] = item;
	         }
	    }
	    let t1 = performance.now();

	    let deltaT = ((t1 - t0)/1000).toFixed(4);
		let timer = `${deltaT} seconds`;

		let filterHasRun = true
		this.props.handleListUpdate(reducedEmails, timer, filterHasRun);

	},

	render() {
		if (this.props.hasRun) {
			return (
				<div className="controlsContainer left">
					<h3>Run Time</h3>
					<p className="runTimer">{this.props.runTime}</p>
					<a href="#" onClick={(e) => this.resetEmails(e)}>Reset List</a>
		        </div>
			)
		} else {
			return (
				<div className="controlsContainer left">
		        	<h3>Remove Duplicates</h3>

		        	<p>Method 2: ES5 `reduce`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsES5(e)}>Try it out</a><br />

		        	<p>Method 3: `no function`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsNoFunction(this.props.emailList)}>Try it out</a><br />

		        	<p>Method 1: ES6 `new Set`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsES6(e)}>Try it out</a><br />
		        </div>
		    )
		}
	}
});

module.exports = EmailFilterController;




