import './styles'
import { fmt } from 'helpers'

export default async function HomeController($scope, UserManager, GroupManager) {
	const vm = $scope.vm = {}

	vm.group = await GroupManager.get({id: 1, with: 'users'})
	
	vm.usersTable = {
		items: vm.group.users,
		cols: [
			{ name: 'Name', prop: 'name' },
			{ name: 'Email', prop: 'email' }
		]
	}

	vm.resolved = true
}