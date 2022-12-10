export interface MarketPiece {
	name: string;
	price: number,
	amplifier?: number
}


export class MarketService {
	constructor() {
		// setTimeout(this.updateMarket, 1000);
	}
	

	private market2: MarketPiece[] = [
		{name: 'apples', price: 3, amplifier : 0},
		{name: 'iron', price: 20, amplifier : 1}
	]

	public getPrices() {
		return [
			...this.market2
		]
	}

	updateMarket() {
		console.log(this.market2);
		for (const [index, value] of this.market2.entries()) {
			// console.log('index', index)
			// console.log('value', value)
			if (value.amplifier == undefined) return;
			this.market2[index].price =+ value.price * value.amplifier/100;
			// console.log('1', this.market[index].price);
			// console.log('12', this.market);
			// console.log('2', value.price * value.amplifier/100)
		}
	}

	// private updatePrice(marketPiece: MarketPiece): void {
	
		
	// 		marketPiece.price = marketPiece.price + Number((marketPiece.price * marketPiece.amplifier) / 100);
			
	// 	return;
	// }

	public increaseAmplifier(type: string, amount: number) {
		// switch (type) {
		// 	case "apples":
		// 		this.amplifiers.apples += amount;
		// 		return;
		// 	case "iron":
		// 		this.amplifiers.iron += amount;
		// 		return;
		// 	default:
		// 		return;
		// }
		// this.amplifiers;
	}
}
