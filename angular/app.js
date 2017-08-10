import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngAsync from 'ng-async'
import ngResource from 'angular-resource'

const dependencies = [
	uiRouter,
	ngAsync.name,
	ngResource
]

export default angular.module('app', dependencies)