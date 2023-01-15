import { Component, OnInit } from "@angular/core";
import { MarketPiece, MarketService } from "./../services/market.service";

@Component({
	selector: "app-price-info",
	templateUrl: "./price-info.component.html",
	styleUrls: ["./price-info.component.css"],
})
export class PriceInfoComponent implements OnInit {
	marketPrices: MarketPiece[] | null = null;
	retailPrices: MarketPiece[] | null = null;

	constructor(private marketService: MarketService) {
		
	}

	ngOnInit(): void {
		setInterval(() => {
			this.marketService.updateMarket();
			this.marketPrices = this.marketService.getPrices();
			this.retailPrices = this.marketService.getRetailPricesOnly();
		}, 1000);
		
	}

	updateMarket() {
		this.marketService.updateMarket();
	}

	// isRetailPriceExist(piece: MarketPiece) {
	// 	return piece.retailPrice
	// }
}
