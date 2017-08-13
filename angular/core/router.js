import app from 'app'
import routes from 'config/routes'

/* @ngInject */
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	// no more !#
	$locationProvider.hashPrefix('')

	// no more # at all
	$locationProvider.html5Mode(true)

	// redirect to the home route on 404
	$urlRouterProvider.otherwise('/')

	// for each state (essentially same thing as route)
	for (var stateName in routes) {
		// get the state name
		var state = routes[stateName]
		
		// if there was any state data including crumb_parent
		if (state.data && state.data.crumb_parent) {
			// then attach the actual fuckin parent object here
			state.data.crumb_parent = routes[state.data.crumb_parent]
		}
		
		// showtime; register the state for actual use
		$stateProvider.state(stateName, state)
	}
})