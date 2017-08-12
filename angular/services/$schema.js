import app from 'app'
import moment from 'moment'
import { isNone } from 'helpers'

app.factory('$schema', function($injector) {
	const service = {}


	// Primitives
	service.String = {
		serialize:   x => isNone(x) ? '' : String(x),
		serialize:   x => ife(isNone(x), '', String(x)),
		deserialize: x => isNone(x) ? '' : String(x)
	}

	service.Float = {
		serialize:   x => isNone(x) ? '' : String(x),
		deserialize: x => isNone(x) ? null : parseFloat(x)
	}

	service.Integer = {
		serialize:   x => isNone(x) ? '' : String(x),
		deserialize: x => isNone(x) ? null : parseInt(x)
	}

	service.Number = service.Float

	service.Date = {
		serialize: x => {
			if (x && !isNaN(x.valueOf())) {
				return moment(x).format('YYYY-MM-DD HH:mm:ss')
			}
			return ''
		},
		deserialize: x => {
			let date = moment(x).toDate()
			return !isNaN(date) ? date : null
		}
	}

	service.Boolean = {
		serialize:   x => String(Number(x)),
		deserialize: x => Number(x) === 1
	}


	// Relationships
	service.BelongsTo = (resource, prop) => {
		return {
			deserialize: (item, relationshipProp) => {
				let $manager = $injector.get(`${resource}Manager`)
				let thing = item[prop || relationshipProp]

				if (!thing) return null

				return $manager.deserialize(thing)
			},
			serialize: (item, relationshipProp) => {
				let $manager = $injector.get(`${resource}Manager`)
				let thing = item[prop || relationshipProp]

				if (!thing) return null

				return $manager.serialize(thing)
			}
		}
	}

	service.HasMany = (resource, prop) => {
		return {
			deserialize: (item, relationshipProp) => {
				let $manager = $injector.get(`${resource}Manager`)
				let things = item[prop || relationshipProp]

				if (!things) return null

				return things.map(thing => $manager.deserialize(thing))
			},
			serialize: (item, relationshipProp) => {
				let $manager = $injector.get(`${resource}Manager`)
				let things = item[prop || relationshipProp]

				if (!things) return null

				return things.map(thing => $manager.serialize(thing))
			}
		}
	}

	return service
})