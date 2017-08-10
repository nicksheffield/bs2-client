const helper = {}

helper.allResolved = function(...items) {
	return items.reduce((s,x) => s && x, true)
}

export default helper