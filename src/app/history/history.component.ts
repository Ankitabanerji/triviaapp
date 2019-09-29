import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public gamesArray: any;
  constructor(public router: Router) { }

  ngOnInit() {
    //fetching game history fron localstorage
    this.gamesArray = JSON.parse(localStorage.getItem("gamesList"));
  }

  //function to start new game
  public restart() {
    this.router.navigate(['ques/1'])
  }
}
