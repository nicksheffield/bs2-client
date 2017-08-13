import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, product_types) {
	const vm = $scope.vm = {}
	
	vm.product_types = product_types
	
	vm.mainTable = {
		items: vm.product_types,
		slug: 'product-type',
		buttons: ['view', 'edit'],
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Number of products', prop: 'product_count' },
		]
	}
}