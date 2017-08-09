import app from './app'
import routes from './routes.json'

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	// no more !#
	$locationProvider.hashPrefix('')

	// no more # at all
	$locationProvider.html5Mode(true)

	// redirect to the home route on 404
	$urlRouterProvider.otherwise('/')

	// construct an object with all routes in it
	let states = routes.reduce((obj, route) => {
		
		// set the name as the key because we use it in the for loop below
		obj[route.name] = {
			// this is the url the user will hit to load this route
			url: route.url,
			// this is the actual controller function that is exported from controller.js
			controller: require(`${route.path}/index`).default,
			// this is the actual html content of view.html
			template: require(`${route.path}/view.html`),
			// this is where any additional route info goes for preRoute parsing
			date: route.data || {}
		}

		// need to pass the obj back into the next reduce iteration
		return obj

	}, {})


	// for each state (essentially same thing as route)
	for(var stateName in states) {
		// get the state name
		var state = states[stateName]
		
		// if there was any state data including crumb_parent
		if (state.data && state.data.crumb_parent) {
			// then attach the actual fuckin parent object here
			state.data.crumb_parent = states[state.data.crumb_parent]
		}
		
		// showtime; register the state for actual use
		$stateProvider.state(stateName, state)
	}
})