import app from '../app'

app.factory('UserManager', function($schema, $flatten, $rest) {
	const service = angular.extend({}, $flatten, $rest)

	service.resource = User

	service.schema = {
		id: $schema.Number,
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
		_relationships: [
			$schema.BelongsTo('Group')
		]
	}

	console.log(service)

	return service
})