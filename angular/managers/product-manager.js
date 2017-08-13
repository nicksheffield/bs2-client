import app from 'app'

app.factory('ProductManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'ProductManager'
	
	service.construct = function Product(){}
	
	service.resource = $resourceFactory('product')

	service.schema = {
		id: $schema.Integer,
		name: $schema.String,
		limitless: $schema.Boolean,
		unit_count: $schema.Integer,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			type: $schema.BelongsTo('ProductType'),
			// unit: $schema:HasMany('Unit')
		}
	}

	return service
})