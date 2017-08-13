import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, products) {
	const vm = $scope.vm = {}
	
	vm.products = products
	
	vm.mainTable = {
		items: vm.products,
		slug: 'product',
		buttons: ['view', 'edit'],
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Type', prop: x => x.type ? x.type.name : '' },
			{ name: 'Number of units', prop: 'unit_count' },
		]
	}
}