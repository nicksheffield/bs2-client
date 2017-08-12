import angular from 'angular'
import uiRouter from '@uirouter/angularjs'
import ngAsync from 'ng-async'
import ngResource from 'angular-resource'
import ngSanitize from 'angular-sanitize'
import ngRoute from 'angular-route'
import ngIdle from 'ng-idle'

const dependencies = [
	ngResource,
	ngSanitize,
	// ngRoute,
	ngIdle,
	
	uiRouter,
	ngAsync.name,
	
]

/*
	'ngIdle',
	'ui.router',
	'ui.tinymce',
	'satellizer',
	'19degrees.ngSweetAlert2',
*/

export default angular.module('app', dependencies)

require('./core/bootstrap')