import app from '../app'

// Use as a mixin
app.factory('$rest', function($rootScope, $timeout, $http, $async) {
	const service = {}

	/**
	 * @method get
	 * @param {Object} query
	 * @return {Object}
	 */
	service.get = async function(query) {
		let response = this.resource.get(query)
		let result = await response.$promise

		$timeout(() => $rootScope.$apply())

		return this.deserialize(response)
	}


	/**
	 * @method query
	 * @param {Object} query (optional)
	 * @return {Array}
	 */
	service.query = async function(query = {}) {
		let response = this.resource.query(query)
		let result = await response.$promise

		$timeout(() => $rootScope.$apply())

		return response.map(x => this.deserialize(x))
	}


	/**
	 * @method save
	 * @param {Object} item
	 * @return {Array or Object}
	 */
	service.save = async function(item) {
		if (item.id) {
			return this.update(item)
		} else {
			return this.create(item)
		}
	}


	/**
	 * @method create
	 * @param {Object} item
	 * @return {Object}
	 */
	service.create = async function(item) {
		console.log(this.serialize(item))
		let response = this.resource.save(this.serialize(item))
		let result = await response.$promise

		$timeout(() => $rootScope.$apply())

		return this.deserialize(response)
	}


	/**
	 * @method update
	 * @param {Object} item
	 * @return {Object}
	 */
	service.update = async function(item) {
		let response = this.resource.update({id: item.id}, this.serialize(item))
		let result = await response.$promise

		$timeout(() => $rootScope.$apply())

		return this.deserialize(response)
	}


	/**
	 * @method delete
	 * @param {Object} item
	 * @return {Object}
	 */
	service.delete = async function(item) {
		let query = {id: typeof item === 'number' ? item : item.id}
		let response = this.resource.delete(query)
		let result = await response.$promise

		$timeout(() => $rootScope.$apply())

		return this.deserialize(response)
	}

	return service
})