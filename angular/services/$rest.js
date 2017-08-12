import app from 'app'
import { isNumber, ife } from 'helpers'

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
		await response.$promise
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
		await response.$promise
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
		let response = this.resource.save(this.serialize(item))
		await response.$promise
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
		await response.$promise
		$timeout(() => $rootScope.$apply())
		return this.deserialize(response)
	}


	/**
	 * @method delete
	 * @param {Object} item
	 * @return {Object}
	 */
	service.delete = async function(item) {
		let response = this.resource.delete(ife(isNumberStr(item), item, item.id))
		await response.$promise
		$timeout(() => $rootScope.$apply())
		return this.deserialize(response)
	}

	return service
})