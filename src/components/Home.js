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
			hasRun: null
		}
	},

	componentDidMount() {
		this.setState({
          emails: combinedEmails,
          emailCache: combinedEmails
        });
	},

	handleListUpdate(reducedEmails, timer, filterHasRun) {
		this.setState({
          emails: reducedEmails,
          runTime: timer,
          hasRun: filterHasRun
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
				/>
		    </div>
		)
	}
})

module.exports = Home;