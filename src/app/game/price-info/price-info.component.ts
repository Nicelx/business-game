import { Component, OnInit } from '@angular/core';
import { MarketPiece, MarketService } from './../services/market.service';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-info',
  templateUrl: './price-info.component.html',
  styleUrls: ['./price-info.component.css']
})
export class PriceInfoComponent implements OnInit {
  market:MarketPiece[]|null  = null
  

  constructor(private marketService: MarketService , private subscription : Subscription ) { }

  ngOnInit(): void {
    this.market = this.marketService.getPrices();
    let time = interval(1000);
    this.subscription = time.subscribe(this.marketService.updateMarket);
    setInterval(this.marketService.updateMarket, 1000)    
  }

  updateMarket() {
    this.marketService.updateMarket();
  }

}
