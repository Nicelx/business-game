import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  isModalVisible = false;
  modalType: string = '';
  creatingCost : number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onGatherOpen() {
    this.isModalVisible = true
    this.modalType = 'Добыча'
  }

}
