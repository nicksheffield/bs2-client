// ./pages/home/index.js

import app from '../../app'
import './styles.styl'

export default async function HomeController($scope, $rest) {
	window.$scope = $scope

	$scope.selected = null

	$scope.people = [
		{ name: 'bob' },
		{ name: 'john' },
		{ name: 'jack' },
	]

	$scope.dropdownConf = {
		text: 'name',
		id: 'name'
	}
}