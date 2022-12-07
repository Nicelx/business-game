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
	
	// amplifiers = {
	// 	apples: 1,
	// 	iron: 0,git 
	// };
	// market: Market = {
	// 	apples: 3,
	// 	iron: 20,
	// };


	//

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
		for (let marketPosition in this.market) {
			this.updatePrice(marketPosition: MarketPiece[])
		}
	}

	private updatePrice(marketPiece: MarketPiece): void {
		let {price, amplifier} = marketPiece;
		if (amplifier > 0) {
			price = price + Number((price * amplifier) / 100);
			this.market[propName] = newPrice;
			return;
		}
		if (amplifierValue < 0) {
			newPrice = price - Number((price * amplifierValue) / 100);
			this.market[propName] = newPrice;
			return;
		}
		return;
	}

	public increaseAmplifier(type: string, amount: number) {
		switch (type) {
			case "apples":
				this.amplifiers.apples += amount;
				return;
			case "iron":
				this.amplifiers.iron += amount;
				return;
			default:
				return;
		}
		this.amplifiers;
	}
}
