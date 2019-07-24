export const computeActualLength = (exp, total) => {
	switch (typeof exp) {
	case 'string': {
		const eval1 = eval
		return eval1(exp) * total
	} case 'number':
		if (exp > 1 || exp < -1) return exp
		else return exp * total
	}
}
