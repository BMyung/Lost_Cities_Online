import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  player_action = null;
  all_hands = [[],[]];
  deck = [];
  active_player = false;
  private context: any;
  private socket: any;
  players = [1,2];
  player_stacks = [
  {"red": [],
  "green":[],
  "blue": [],
  "white":[],
  "yellow":[]},
  
  {"red": [],
  "green":[],
  "blue": [],
  "white":[],
  "yellow":[]}]

  discard_stacks = {
    "red": [],
    "green":[],
    "blue": [],
    "white":[],
    "yellow":[]
}

  constructor() {}
  ngOnInit(){
this.socket = io("http://localhost:8000");

// this.reset()
}

  ngAfterViewInit() {
    this.socket.on("message", data => {
        console.log("comp", data);
      });
    this.socket.on("new_game", data =>{
      console.log("newgame"),
      this.all_hands = data.all_hands,
      this.deck = data.deck,
      this.player_action = data.p_action,
      this.discard_stacks = data.discard
 
    },
      )
    this.socket.on("update", data =>{
      this.all_hands = data.all,
      this.player_action = data.action,
      this.discard_stacks = data.discard,
      this.player_stacks = data.player
    });
    }

newGame(){
  this.socket.emit("new")
}

selectCard(card){
  if (this.active_player = true){
  var index = this.all_hands[0].indexOf(card)
  this.socket.emit("selectCard", {"action": this.player_action, "card": card, "index": index});
}
}

}