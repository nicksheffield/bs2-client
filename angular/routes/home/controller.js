// ./pages/home/index.js

import app from '../../app'
import './styles.styl'

import { fmt } from '../../helpers/Date'

export default async function HomeController($scope, UserManager, GroupManager) {
	window.$scope = $scope
	window.UserManager = UserManager
	window.GroupManager = GroupManager

	$scope.submit = async function() {
		$scope.group = await GroupManager.save({
			code: $scope.code
		})

		$scope.groups.push($scope.group)
	}

	$scope.delete = async function(item) {
		await GroupManager.delete(item)

		$scope.groups = $scope.groups.filter(x => x !== item)
	}

	$scope.group = await GroupManager.get({id: 1, with: 'users'})

	
	$scope.usersTable = {
		items: $scope.group.users,
		cols: [
			{
				name: 'Name',
				prop: 'name'
			},
			{
				name: 'Email',
				prop: 'email'
			}
		]
	}

	$scope.resolved = true
}