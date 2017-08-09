import app from '../app'

app.factory('$rest', function($rootScope, $timeout, $http, $async) {
	const service = {}

	service.get = $async(function*(query) {
		let req = $http.get(`http://api.fixer.io/latest`)

		let res = yield req
		$timeout(() => $rootScope.$apply())

		return res.data
	})

	return service
})