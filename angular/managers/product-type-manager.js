import app from 'app'

app.factory('ProductTypeManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'ProductTypeManager'
	
	service.construct = function ProductType(){}
	
	service.resource = $resourceFactory('product-type')

	service.schema = {
		id: $schema.Integer,
		name: $schema.String,
		product_count: $schema.Integer,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			products: $schema.HasMany('Product'),
		}
	}

	return service
})