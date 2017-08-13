import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope) {
	const vm = $scope.vm = {}

	vm.bookings = []
	
	vm.mainTable = {
		items: vm.bookings,
		cols: [
			{
				name: 'Pickup',
				prop: 'pickup_at'
			}
		]
	}
}