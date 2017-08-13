import auth from 'core/auth'

const list = [
	{
		"name": "home",
		"url": "/",
		"path": "routes/home",
		"resolve": {
			/* @ngInject */ "users": UserManager => UserManager.query({with: 'group'}),
			/* @ngInject */ "groups": GroupManager => GroupManager.query(),
		}
	},
	{
		"name": "users",
		"url": "/users",
		"path": "routes/users/index",
		"resolve": {
			/* @ngInject */ "users": UserManager => UserManager.query({with: 'group'}),
			/* @ngInject */ "groups": GroupManager => GroupManager.query(),
		}
	},
	{
		"name": "classes",
		"url": "/classes",
		"path": "routes/classes/index",
		"resolve": {
			/* @ngInject */ "groups": GroupManager => GroupManager.query({with: 'type|tutors'}),
			/* @ngInject */ "group_types": GroupTypeManager => GroupTypeManager.query(),
			/* @ngInject */ "users": UserManager => UserManager.query(),
		}
	},
	{
		"name": "class-types",
		"url": "/class-types",
		"path": "routes/class_types/index",
		"resolve": {
			/* @ngInject */ "group_types": GroupTypeManager => GroupTypeManager.query(),
		}
	},
	{
		"name": "products",
		"url": "/products",
		"path": "routes/products/index",
		"resolve": {
			/* @ngInject */ "products": ProductManager => ProductManager.query({with: 'type'}),
		}
	},
	{
		"name": "product-types",
		"url": "/product-types",
		"path": "routes/product_types/index",
		"resolve": {
			/* @ngInject */ "product_types": ProductTypeManager => ProductTypeManager.query(),
		}
	},
	{
		"name": "units",
		"url": "/units",
		"path": "routes/units/index",
		"resolve": {
			/* @ngInject */ "units": UnitManager => UnitManager.query({with: 'product'}),
			/* @ngInject */ "products": ProductManager => ProductManager.query(),
		}
	},
	{
		"name": "kits",
		"url": "/kits",
		"path": "routes/kits/index",
		"resolve": {
			/* @ngInject */ "kits": KitManager => KitManager.query(),
		}
	},
]

export default list.reduce((obj, route) => {
	obj[route.name] = {
		url: route.url,
		controller: require(`../${route.path}/controller`).default,
		template: require(`../${route.path}/view.html`),
		resolve: route.resolve,
		data: route.data || {},
	}

	return obj
}, {})