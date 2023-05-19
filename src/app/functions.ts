
export function arrayMinusArray(fullArray: string[], toReduceArray: string[]) {
	let result = [...fullArray];

	toReduceArray.forEach(fullArraySingleString => {
		result = result.filter(toReduceArraySingleString => fullArraySingleString !== toReduceArraySingleString)
	})

	console.log(result);
	return result
} 

export function randomArrayElement (array: any[]) {
	if (!array) throw new Error('Array not providing to randomArrayElement function')
	let length = array.length;
	let result = array[Math.floor(Math.random()* length)]
	return result
}