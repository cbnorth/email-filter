import React from 'react';

let Main = React.createClass({
	render() {
		return (
			<div className="mainContainer">
				<header className="mainContainer__header">
					<h1>Email Filter Test</h1>
				</header>
				<div className="mainContainer__mainContent">
					{this.props.children}
				</div>
			</div>
		)
	}
});

module.exports = Main;