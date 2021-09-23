import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Game } from '../models';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  gameRating = 0;
  gameId!: number;
  game!: Game;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: ServiceService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
    this.gameId = params['id'];
    this.httpService.getGameDetails(this.gameId).subscribe((gameResp)=>{
      this.game=gameResp;
      
      setTimeout(() => {
        this.gameRating = this.game.metacritic;
      }, 1000);
    });
    
    });
  }

     
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

}
