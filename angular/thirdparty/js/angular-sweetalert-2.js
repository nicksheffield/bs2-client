import swal from 'sweetalert2'
import angular from 'angular'

const swalModule = angular.module('swal', [])
	
swalModule.factory('$swal', function() {
	return swal
})

export default swalModule