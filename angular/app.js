import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngAsync from 'ng-async'

const app = angular.module('app', [
	uiRouter,
	ngAsync.name
])

export default app