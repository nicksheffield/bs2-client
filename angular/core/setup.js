import app from 'app'

// Global helpers
import helpers from 'helpers'

app.run(function($rootScope) {
	
	// Add all global helpers as methods on $rootScope
	for (let prop in helpers) {
		$rootScope[prop] = helpers[prop]
	}
})