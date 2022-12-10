import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from './services/market.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  isModalVisible = false;
  modalType: string = '';
  creatingCost : number = 1;
  gameId : number | null = null
  

  constructor(private route : ActivatedRoute, private marketService: MarketService) { }



  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.gameId = Number(routeParams.get('gameId'))
  }

  onGatherOpen() {
    this.isModalVisible = true
    this.modalType = 'Добыча'
  }

}