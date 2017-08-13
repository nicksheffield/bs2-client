import app from 'app'

app.factory('KitManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'KitManager'
	
	service.construct = function Kit(){}
	
	service.resource = $resourceFactory('kit')

	service.schema = {
		id: $schema.Integer,
		name: $schema.String,
		product_count: $schema.String,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			products: $schema.HasMany('Product')
		}
	}

	return service
})