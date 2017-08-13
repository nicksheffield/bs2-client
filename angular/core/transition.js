import app from 'app'
import { env } from 'config'

app.run(function($transitions, $rootScope, $swal, $trace, $state, $timeout) {
	if (env !== 'production') $trace.enable(1)

	$transitions.onStart({}, function(trans) {
		$rootScope.loading = true
	})

	$transitions.onFinish({}, function(trans) {
		$rootScope.loading = false
	})

	// https://ui-router.github.io/ng1/docs/latest/interfaces/transition.hookmatchcriteria.html
	// this is an example of how to handle entering a route with an auth condition
	// $transition.onEnter({
	// 	to: function(state) {
	// 		return state.data.auth && state.data.auth.indexOf('manager') !== -1
	// 	}
	// }, function(trans) {

	// })

	$transitions.onError({}, function(trans) {
		$rootScope.loading = false
	})

	$state.defaultErrorHandler(function(e) {
		$swal(
			'Oops...',
			e.detail.data.error || 'An unknown REST API error occured',
			'error'
		)
	})
})