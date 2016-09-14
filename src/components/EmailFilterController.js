import React from 'react';

let EmailFilterController = React.createClass({
	getInitialState () {
	    return {
	     	buttonState: ""
	    }
	},

	resetEmails() {
		let emailCache = this.props.emailCache;
		let timer = null;
		let filterHasRun = null;
		this.props.handleListUpdate(emailCache, timer, filterHasRun)
	},

	//Note: I could have written this in a more DRY manner, where each filtering method was part of a single parent function. However, I found that nesting a conditional statement inside a single function (in order to determine which sub method to run) added to the run time of the parent method. Since time was a primary concern when comparing the efficiancy of the methods I opted to write each as a standalone method to test it's efficiancy in a more real-world scenario 

	reduceEmailsES5() {
		this.setState({buttonState: 'loading'}, () => {
			let t0 = performance.now();
			let reducedEmails = this.props.emailList.reduce(function(a,b){
				if (a.indexOf(b) < 0 ) a.push(b);
				return a;
			},[]);
			let t1 = performance.now();
			
			let deltaT = ((t1 - t0)/1000).toFixed(4);
			let timer = `${deltaT} seconds`;

			let copy = `This filter approach relies on the javaScript array method "reduce", which compares each value of the original array against itself and results in a reduced list. While this was a familiar approach to take, it had it's costs. At small scales the overhead required by JavaScript functions is negligible, but at large scales a function  could potentially crash if it runs out of stack space and results in a longer run time.`;

			let filterHasRun = true
			this.props.handleListUpdate(reducedEmails, timer, filterHasRun, copy);
			this.setState({buttonState: null})
		})
	},

	reduceEmailsNoFunction(emailArray) {
		let t0 = performance.now();
	    var obvservedItem = {};
	    var reducedEmails = [];
	    var j = 0;
	    for(var item of emailArray) {
	         if(obvservedItem[item] !== 1) {
	               obvservedItem[item] = 1;
	               reducedEmails[j++] = item;
	         }
	    }
	    let t1 = performance.now();

	    let deltaT = ((t1 - t0)/1000).toFixed(4);
		let timer = `${deltaT} seconds`;

		let copy = `For this approach I opted to not use a function, which can break down at scale, and instead chose to use the ES6 "for-in" loop. This loop pushes each item in an array to an empty object which is used as a base of comparison to test against - if the item exists in the object then it will be filtered out and placed into a new array that does not contain it's pair.`;

		let filterHasRun = true
		this.props.handleListUpdate(reducedEmails, timer, filterHasRun, copy);
	},

	reduceEmailsES6() {
		let t0 = performance.now();
		let reducedEmails = [ ...new Set(this.props.emailList) ];
		let t1 = performance.now();
		
		let deltaT = ((t1 - t0)/1000).toFixed(4);
		let timer = `${deltaT} seconds`;

		let copy = `This filter approach was by far the fastest, but skirts around the intention of the experiment as it relies on the ES6 method "new Set()", which filters items of an array and returns only unique values.`

		let filterHasRun = true
		this.props.handleListUpdate(reducedEmails, timer, filterHasRun, copy);
	},

	render() {
		if (this.state.buttonState) {
			console.log('go')
			return (
				<div className="controlsContainer left">
					<p>loading</p>
				</div>
			)
		} else if (this.props.hasRun) {
			return (
				<div className="controlsContainer left">
					<h3>Run Time</h3>
					<p className="runTimer">{this.props.runTime}</p>
					<p>{this.props.justificationCopy}</p>
					<a href="#" onClick={(e) => this.resetEmails(e)}>Reset List</a>
		        </div>
			)
		} else {
			return (
				<div className="controlsContainer left">
		        	<h3>Remove Duplicates</h3>

		        	<p>Method 1: ES5 `reduce`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsES5(e)}>Try it out</a><br />

		        	<p>Method 2: `for-in loop`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsNoFunction(this.props.emailList)}>Try it out</a><br />

		        	<p>Method 3: ES6 `new Set`</p>
		        	<a href="#" className="btn" onClick={(e) => this.reduceEmailsES6(e)}>Try it out</a><br />
		        </div>
		    )
		}
	}
});

module.exports = EmailFilterController;




