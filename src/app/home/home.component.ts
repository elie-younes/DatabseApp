
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from '../models';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort!:string ;
  public games!: Array<Game>;


  constructor(
    private httpService: ServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=>{
      if(params['game-search']){
        this.searchGames('metacritic', params['game-search']);
      }
      else{
        this.searchGames('metacritic');
      }
    });
  }
 
 
  searchGames(sort:string,search?:string){
   this.httpService.getGameList(sort,search)
   .subscribe((gameList:APIResponse<Game>)=>{
    this.games=gameList.results;
    console.log(gameList);
    })
   }
   
openGameDetails(id:string){
  this.router.navigate(['details',id]);
}

}
