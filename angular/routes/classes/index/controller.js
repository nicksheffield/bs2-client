import './styles'
import { fmt } from 'helpers'

/* @ngInject */
export default function($scope, groups, group_types, users) {
	const vm = $scope.vm = {}

	vm.users = users
	vm.groups = groups
	vm.group_types = group_types

	vm.mainTable = {
		items: vm.groups,
		slug: 'group',
		buttons: ['view', 'edit'],
		cols: [
			{
				name: 'Code',
				prop: 'code',
			},
			{
				name: 'Type',
				prop: x => x.type ? x.type.code : '',
				filter: {
					type: 'dropdown2',
					items: vm.group_types,
					config: {
						text: 'code',
						id: 'id',
						multiple: true,
						clearable: true,
						small: true
					}
				}
			},
			{
				name: 'Tutors',
				prop: x => {
					return x.tutors.length ?
					x.tutors.reduce((s,y) => s.concat(y.name), []).join(', ') :
					''
				},
				filter: {
					type: 'dropdown2',
					items: vm.users.filter(x => x.admin),
					config: {
						text: 'name',
						id: 'id',
						multiple: true,
						clearable: true,
						small: true
					}
				}
			},
			{
				name: 'Number of students',
				prop: 'student_count'
			}
			
		]
	}
}