export function arrayMinusArray(fullArray: string[], toReduceArray: string[]) {
	let result = [...fullArray];

	fullArray.forEach(fullArraySingleString => {
		result = result.filter(toReduceArraySingleString => fullArraySingleString !== toReduceArraySingleString)
	})

	console.log(result);
} 



arrayMinusArray(['One' , 'Two' , 'Three'], ['Two'])