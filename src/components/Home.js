import React from 'react';
import combinedEmails from '../utils/emailgen';
import EmailList from './EmailList';
import EmailFilterController from './EmailFilterController';

let Home = React.createClass({
	getInitialState(){
		return {
			emails: [],
			emailCache: [],
			runTime: null,
			hasRun: null,
			justificationCopy: null
		}
	},

	componentDidMount() {
		this.setState({
          emails: combinedEmails,
          emailCache: combinedEmails
        });
	},

	handleListUpdate(reducedEmails, timer, filterHasRun, copy) {
		this.setState({
          emails: reducedEmails,
          runTime: timer,
          hasRun: filterHasRun,
          justificationCopy: copy
        });
	},

	render() {
		return(
			<div>
				<EmailList emailsItems={this.state.emails} />
				<EmailFilterController 
					runTime={this.state.runTime} 
					emailList={this.state.emails}
					handleListUpdate={this.handleListUpdate}
					emailCache={this.state.emailCache}
					hasRun={this.state.hasRun}
					justificationCopy={this.state.justificationCopy}
				/>
		    </div>
		)
	}
})

module.exports = Home;