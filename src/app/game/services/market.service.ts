// import { Market } from "../interfaces/game.interfaces";
// import { marketKey } from "../interfaces/game.interfaces";

interface MarketPiece {
	name: string;
	price: number,
	amlifier: number
}

export class MarketService {
	constructor() {
		setTimeout(this.updateMarket, 1000);
	}
	

	market = [
		{name: 'apples', price: 3, amplifier : 0},
		{name: 'iron', price: 20, amplifier : 0}
	]
	// marketKeys = Object.keys(this.market);
	// amlifiersKeys = Object.keys(this.amplifiers);

	public getPrices() {
		return {
			...this.market
		}
	}

	updateMarket() {
		for (const [index, value] of this.market.entries()) {
			// this.updatePrice(marketPosition: MarketPiece[])
			this.market[index].price =+ value.price * value.amplifier/100;
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
