import app from 'app'
import './styles'

app.directive('loader', function($rootScope) {
	function link(scope, el, attrs) {
		scope.loading = $rootScope.loading
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		template: require('./view.html')
	}
})