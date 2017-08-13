let ENV = process.env.NODE_ENV || 'local'

const conf = {
	'local': {
		'apiBaseUrl': 'http://localhost:8000'
	},
	'staging': {
		'apiBaseUrl': 'http://api.staging.quartermaster.yoobee.net.nz',
	},
	'production': {
		'apiBaseUrl': 'http://api.quartermaster.yoobee.net.nz',
	}
}

export default conf[ENV]
export const config = conf
export const env = ENV