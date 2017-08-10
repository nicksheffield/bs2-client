import app from '../app'

app.factory('UserManager', function($rest, $modelSerializer, $schema, $resourceFactory) {
	const service = angular.extend({}, $rest, $modelSerializer)

	service.name = 'UserManager'

	service.construct = function User(){}

	service.resource = $resourceFactory('user', {
		getWithToken: {
			methods: 'GET',
			url: '/api/auth',
			params: { with: 'tutors_group.type' }
		}
	})

	service.schema = {
		id: $schema.Integer,
		name: $schema.String,
		email: $schema.String,
		phone: $schema.String,
		id_number: $schema.String,
		dob: $schema.Date,
		admin: $schema.Boolean,
		can_book: $schema.Boolean,
		can_book_reason: $schema.String,
		new_user: $schema.Boolean,
		active: $schema.Boolean,
		created_at: $schema.Date,
		updated_at: $schema.Date,
		_relationships: {
			group: $schema.BelongsTo('Group')
		}
	}

	return service
})