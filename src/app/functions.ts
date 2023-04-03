export function arrayMinusArray(fullArray: string[], toReduceArray: string[]) {
	let result = [...fullArray];

	toReduceArray.forEach(fullArraySingleString => {
		result = result.filter(toReduceArraySingleString => fullArraySingleString !== toReduceArraySingleString)
	})

	console.log(result);
	return result
} 
