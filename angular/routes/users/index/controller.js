import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, users, groups) {
	const vm = $scope.vm = {}
	
	vm.users = users
	vm.groups = groups
	
	vm.mainTable = {
		items: vm.users,
		slug: 'users',
		buttons: ['view', 'edit'],
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Email', prop: 'email' },
			{ name: 'Phone', prop: 'phone' },
			{
				name: 'Role',
				prop: 'role',
				filter: {
					type: 'dropdown2',
					items: [
						{ name: 'Manager' },
						{ name: 'Staff' },
						{ name: 'Student' },
					],
					config: {
						text: 'name',
						id: 'name',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
			{
				name: 'Class',
				prop: x => x.group ? x.group.code : '',
				filter: {
					type: 'dropdown2',
					items: vm.groups,
					config: {
						text: 'code',
						id: 'code',
						multiple: true,
						small: true,
						clearable: true,
					}
				}
			},
		]
	}
}