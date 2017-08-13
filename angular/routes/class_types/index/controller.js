import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, group_types) {
	const vm = $scope.vm = {}

	vm.group_types = group_types
	
	vm.mainTable = {
		items: vm.group_types,
		slug: 'class-type',
		buttons: ['view', 'edit'],
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Code', prop: 'code' },
			{ name: 'Number of classes', prop: 'class_count' },
		]
	}
}