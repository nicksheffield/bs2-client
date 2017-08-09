// ./pages/other/index.js

import app from '../../app'
import './styles.styl'

export default async function OtherController($scope, $rest) {
	$scope.cur = await $rest.get()
	$scope.oth = await $rest.get()
	$scope.resolved = true
}