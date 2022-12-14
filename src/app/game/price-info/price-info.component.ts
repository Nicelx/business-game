import { Component, OnInit } from "@angular/core";
import { MarketPiece, MarketService } from "./../services/market.service";
import { interval } from "rxjs";

@Component({
	selector: "app-price-info",
	templateUrl: "./price-info.component.html",
	styleUrls: ["./price-info.component.css"],
})
export class PriceInfoComponent implements OnInit {
	marketPrices: MarketPiece[] | null = null;
	// private subscription : Subscription;

	constructor(private marketService: MarketService) {}

	ngOnInit(): void {
		this.marketPrices = this.marketService.getPrices();
		let time = interval(1000);
		console.log(time);
		// this.subscription = time.subscribe(this.marketService.updateMarket);
	}

	updateMarket() {
		this.marketService.updateMarket();
		setInterval(() => {
			this.marketService.updateMarket();
      this.marketPrices = this.marketService.getPrices();
		}, 1000);
	}
}
