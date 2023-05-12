import { Component, OnInit } from '@angular/core';
import { BotsService } from '../services/bots-service';

@Component({
  selector: 'app-bots-info',
  templateUrl: './bots-info.component.html',
  styleUrls: ['./bots-info.component.css']
})
export class BotsInfoComponent implements OnInit {

  constructor(private botsService: BotsService) { }
  bots = this.botsService.getBots()
  
  ngOnInit(): void {
  }

}
