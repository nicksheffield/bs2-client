import app from '../app'

app.factory('$schema', function($injector) {
	const service = {}


	// Primitives

	service.String = {
		serialize:   x => String(x),
		deserialize: x => String(x)
	}

	service.Number = {
		serialize:   x => String(x),
		deserialize: x => parseFloat(x)
	}

	service.Date = {
		serialize:   x => moment(x).format('YYYY-MM-DD HH:mm:ss'),
		deserialize: x => moment(x).toDate()
	}

	service.Boolean = {
		serialize:   x => String(Number(x)),
		deserialize: x => Number(x) === 1
	}


	// Relationships

	service.BelongsTo = (resource, prop) => {
		// let manager = $injector.get(`${resource}Manager`)
		// let model = $injector.get(resource)

		return x => {
			
		}
	}

	service.hasMany = (resource, prop, foreign_key) => {
		
	}

	return service
})