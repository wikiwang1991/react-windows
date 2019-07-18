export const computeActualLength = (exp, total) => {
	switch (typeof exp) {
	case 'string':
		return eval(exp) * total
	case 'number':
		return exp * total
	}
}

export const numberToString = (value, size) => {
	let str = value.toString()
	if (str.length < size) str = '0' + str
	return str
}

export const secondsToString = (seconds) => {
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)

	return numberToString(hours, 2) + ':' +
		numberToString(minutes % 60, 2) + ':' +
		numberToString(seconds % 60, 2)
}
