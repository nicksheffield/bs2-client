import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, units, products) {
	const vm = $scope.vm = {}
	
	vm.units = units
	vm.products = products
	
	vm.mainTable = {
		items: vm.units,
		slug: 'units',
		buttons: ['view', 'edit'],
		orderBys: [
			'product_id',
			x => parseInt(x['Unit No.'])
		],
		additionalProps: [
			{
				name: 'product_id',
				prop: x => x.product ? x.product.id : ''
			}
		],
		cols: [
			{
				name: 'Product',
				prop: x => x.product ? x.product.name : '',
				filter: {
					type: 'dropdown2',
					items: vm.products,
					config: {
						text: 'name',
						id: 'id',
						multiple: true,
						clearable: true,
						small: true,
					}
				}
			},
			{ name: 'Unit No.', prop: 'unit_number' },
			{ name: 'Serial No.', prop: 'serial_number' },
			{ name: 'Asset No.', prop: 'asset_number' },
		]
	}
}