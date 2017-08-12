import app from 'app'

app.filter('page', function($filter) {
	return function(input, page, limit) {
		return $filter('limitTo')(input, limit, (page - 1) * limit)
	}
})