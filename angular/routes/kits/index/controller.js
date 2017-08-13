import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, kits) {
	const vm = $scope.vm = {}
	
	vm.kits = kits
	
	vm.mainTable = {
		items: vm.kits,
		slug: 'kits',
		buttons: ['view', 'edit'],
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Number of products', prop: 'product_count' },
		]
	}
}