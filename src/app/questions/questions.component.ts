import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public ques: any;
  public cricketers: any;
  public colors: any;
  public games: any;
  public name: any;
  public today: any;
  constructor(public _route: ActivatedRoute, public router: Router, private toastr: ToastrService) {
    this.name = "";
    this.cricketers = { //options for cricketers
      list: ['Sachin Tendulkar', 'Virat Kolli', 'Adam Gilchirst', 'Jacques Kallis'],
      selected: ""
    };
    this.colors = { //options for colors for flag
      list: ['White', 'Yellow', 'Orange', 'Green'],
      selected: []
    };
    this.games = []
  }

  ngOnInit() {
    this._route.params.subscribe((paramdata) => {
      this.ques = paramdata.no;
      if (this.ques == 1) { //when the game starts
        this.today = new Date(); //fetch date and time at the start of game 
        let gameArray = JSON.parse(localStorage.getItem("gamesList")); //gets game history
        if (gameArray != null) {
          this.games = gameArray;
        }
      }
      if (this.ques == 4) { //summary section
        //storing game data in local storage
        let obj = {
          name: this.name,
          cricketer: this.cricketers.selected,
          colors: this.colors.selected,
          date: this.today
        }
        this.games.push(obj);
        localStorage.setItem("gamesList", JSON.stringify(this.games))
      }
    })
  }

  //function to select a crickrter
  public selectedCricketer(event) {
    this.cricketers.selected = event.target.value;
  }

  //function to select a color
  public selectedColors(event) {
    if (event.target.checked) {
      this.colors.selected.push(event.target.value)
    }
    else {
      let str = event.target.value;
      let i = this.colors.selected.indexOf(str);
      if (i != -1) {
        this.colors.selected.splice(i, 1);
      }
    }
  }

  //function to go to next question
  public nextpage(num): any {
    switch (num) {
      case 1: {
        if (this.name == "") {
          this.toastr.error('Please enter your name', 'Error', { timeOut: 3000 });
        } else {
          this.router.navigate(['ques', num + 1]);
        }
        break;
      }
      case 2: {
        if (this.cricketers.selected == "") {
          this.toastr.error('Please select a cricketer', 'Error', { timeOut: 3000 });
        } else {
          this.router.navigate(['ques', num + 1]);
        }
        break;
      }
      case 3: {
        if (this.colors.selected.length == 0) {
          this.toastr.error('Please select atleast one color', 'Error', { timeOut: 3000 });
        } else {
          this.router.navigate(['ques', num + 1]);
        }
        break;
      }
    }
  }

  //funtion to restart the game once finished with prev game
  public finish() {
    this.name = "";
    this.cricketers.selected = "";
    this.colors.selected = [];
    this.router.navigate(['ques/1'])
  }

  //function to navigate to history page
  public history() {
    this.router.navigate(['history'])
  }
}
