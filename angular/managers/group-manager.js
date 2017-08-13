import app from 'app'

app.factory('GroupManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'GroupManager'
	
	service.construct = function Group(){}
	
	service.resource = $resourceFactory('group')

	service.schema = {
		id: $schema.Integer,
		code: $schema.String,
		student_count: $schema.Integer,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			users: $schema.HasMany('User'),
			type: $schema.BelongsTo('GroupType'),
			tutors: $schema.HasMany('User', 'tutors')
		}
	}

	return service
})