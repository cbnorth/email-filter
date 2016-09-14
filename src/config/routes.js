import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

export default (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
		</Route>
	</Router>
)