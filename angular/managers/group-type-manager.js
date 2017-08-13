import app from 'app'

app.factory('GroupTypeManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'GroupTypeManager'
	
	service.construct = function GroupType(){}
	
	service.resource = $resourceFactory('group-type')

	service.schema = {
		id: $schema.Integer,
		code: $schema.String,
		name: $schema.String,
		class_count: $schema.Integer,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			groups: $schema.HasMany('Group'),
		}
	}

	return service
})