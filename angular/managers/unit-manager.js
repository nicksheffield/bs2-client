import app from 'app'

app.factory('UnitManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'UnitManager'
	
	service.construct = function Unit(){}
	
	service.resource = $resourceFactory('unit')

	service.schema = {
		id: $schema.Integer,
		unit_number: $schema.String,
		serial_number: $schema.String,
		asset_number: $schema.String,
		notes: $schema.String,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			product: $schema.BelongsTo('Product'),
			// bookings: $schema.HasMany('bookings')
		}
	}

	return service
})