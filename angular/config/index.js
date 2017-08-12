import env from '../../env.js'

const conf = {
	'local': {
		'apiBaseUrl': 'http://localhost:8000',
	},
	'staging': {
		'apiBaseUrl': 'http://api.staging.quartermaster.yoobee.net.nz',
	},
	'production': {
		'apiBaseUrl': 'http://api.quartermaster.yoobee.net.nz',
	}
}

export default conf[env.environment]
export const config = conf