import { Market } from "../interfaces/game.interfaces";
import { marketKey } from "../interfaces/game.interfaces";

export class MarketService {
	constructor() {
		setTimeout(this.updateMarket, 1000);
	}
	
	// amplifiers = {
	// 	apples: 1,
	// 	iron: 0,
	// };
	// market: Market = {
	// 	apples: 3,
	// 	iron: 20,
	// };


	//

	market2 = [
		{name: 'apples', price: 3, amlifier : 0},
		{name: 'apples', price: 3, amlifier : 0}
	]
	marketKeys = Object.keys(this.market);
	amlifiersKeys = Object.keys(this.amplifiers);

	public getPrices(): Market {
		return {
			...this.market
		}
	}

	updateMarket() {
		for (let propNameMarket: marketKey in this.marketKeys) {
			for (propNameAmlifiers: marketKey in this.marketKeys) {

			}
		}
	}

	private updatePrice(propName : marketKey, amplifierValue: number, price: number, ): void {
		let newPrice: number = 0;
		if (amplifierValue > 0) {
			newPrice = price + Number((price * amplifierValue) / 100);
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
