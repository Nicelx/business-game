export interface MarketPiece {
	name: string;
	price: number,
	amplifier?: number
}


export class MarketService {
	constructor() {
		// setTimeout(this.updateMarket, 1000);
		this.updateMarket();
	}
	

	private market: MarketPiece[] = [
		{name: 'apples', price: 3, amplifier : 0},
		{name: 'iron', price: 20, amplifier : 1}
	]

	public getPrices() {
		return [
			...this.market
		]
	}

	updateMarket() {
		this.market.forEach((marketPiece: MarketPiece, index) => {
			if (marketPiece.amplifier == undefined) return;
			this.market[index].price = (this.market[index].price + marketPiece.price * (marketPiece.amplifier/100)).toFixed(2);
		})

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
