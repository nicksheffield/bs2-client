import app from '../app'

// Use as a mixin
app.factory('$modelSerializer', function() {
	const service = {}

	/**
	 * Creates a new object based of the data from item, and the transformers from this.schema
	 */
	service.deserialize = function(item) {
		const obj = new this.construct()

		if (!item) return null

		for (let prop in this.schema) {
			if (prop === '_relationships') continue
				
			let deserialize = this.schema[prop].deserialize

			obj[prop] = deserialize(item[prop])
		}

		if (this.schema._relationships) {
			for (let prop in this.schema._relationships) {
				obj[prop] = this.schema._relationships[prop].deserialize(item, prop)
			}
		}

		return obj
	}

	service.serialize = function(item) {
		const obj = {}

		obj._model = item.constructor.name

		for (let prop in this.schema) {
			if (prop === '_relationships') continue

			let deserialize = this.schema[prop].serialize

			obj[prop] = deserialize(item[prop])
		}

		if (this.schema._relationships) {
			for (let prop in this.schema._relationships) {
				obj[prop] = this.schema._relationships[prop].serialize(item, prop)
			}
		}

		return obj
	}

	return service
})