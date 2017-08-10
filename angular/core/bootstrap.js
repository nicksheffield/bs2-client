import app from '../app'

// Global helpers
import helper from '../helpers/Global'

app.run(function($rootScope) {
	$rootScope.helper = helper
})