import app from 'app'
import './styles'

app.directive('navigation', function($state, $transitions) {
	function link(scope, el, attrs) {
		const vm = scope.vm = {}

		$transitions.onFinish({}, function(trans) {
			vm.current = trans.$to()
		})

		vm.isCurrent = stateName => stateName === vm.current ? vm.current.name : false

		const link = (state, text, links = []) => ({state, text, links})

		vm.links = [
			link('home', 'Home'),
			link('bookings', 'All Bookings'),
			link('', 'Manage', [
				link('users', 'Users'),
				link('classes', 'Classes'),
				link('class-types', 'Class Types'),
				link('products', 'Products'),
				link('product-types', 'Product Types'),
				link('units', 'Units'),
				link('kits', 'Kits'),
			]),
		]
	}

	return {
		restrict: 'E',
		replace: true,
		link: link,
		template: require('./view.html')
	}
})