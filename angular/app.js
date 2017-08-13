// First party
import angular       from 'angular'
import ngResource    from 'angular-resource'
import ngSanitize    from 'angular-sanitize'

// Third party
import uiRouter      from '@uirouter/angularjs'
import ngIdle        from 'ng-idle'
import satellizer    from 'satellizer'

// Shims
import uiTinyMCE     from 'thirdparty/js/angular-ui-tinymce'
// import ngSweetAlert2 from 'thirdparty/js/angular-sweetalert-2'
import swal          from 'thirdparty/js/angular-sweetalert-2'

const dependencies = [
	ngResource, ngSanitize,
	uiRouter, ngIdle, satellizer,
	uiTinyMCE.name, swal.name,
]

export default angular.module('app', dependencies)

require('./core/bootstrap')