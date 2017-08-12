import app from 'app'
import config from 'config'

app.factory('$resourceFactory', function($resource) {
	const service = function(slug, methods = {}) {

		const url = `${config.apiBaseUrl}/api/${slug}/:id`

		const defaults = {
			'id': '@id'
		}

		methods.update = {
			method: 'PUT'
		}

		return $resource(url, defaults, methods)
	}

	return service
})