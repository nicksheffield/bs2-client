import app from '../../app'
import $ from 'jQuery'

app.directive('myDir', function() {

	const link = (scope, element, attrs) => {
		// $('body').css('background', 'yellow')
	}

	return {
		link,
		restrict: 'E',
		replace: true,
		template: require('./view.html')
	}
})