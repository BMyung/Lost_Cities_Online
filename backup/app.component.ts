import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //   player1_stacks = {
  //     "red": [],
  //     "green":[],
  //     "blue": [],
  //     "white":[],
  //     "yellow":[]
  // }
  //   player2_stacks = {
  //     "red": [],
  //     "green":[],
  //     "blue": [],
  //     "white":[],
  //     "yellow":[]
  // }
  
  

  private context: any;
  private socket: any;
  card = {
    num: String,
    color: String,
    id: String,
    val: Number
  }
 

  constructor() {}
  ngOnInit(){
this.socket = io("http://localhost:8000");
// this.reset()
}

  ngAfterViewInit() {
    this.socket.on("id", data => {
        this.player_id=data;
      });
    this.socket.on("new", data =>{
      this.all_hands = data.all_hands,
      this.deck = data.deck,
      this.discard_stacks = {
        "red": [],
        "green":[],
        "blue": [],
        "white":[],
        "yellow":[]
      },
      this.player_action = null
    },
      )
    this.socket.on("update", data =>{
      this.all_hands = data.all,
      this.player_action = data.action,
      this.discard_stacks = data.discard
    });
    }

newGame(){
  this.socket.emit("new")
}

selectCard(card){
  var index = this.all_hands[0].indexOf(card)
  this.socket.emit("select", {"card": card, "action": this.player_action, "discard": this.discard_stacks, "all": this.all_hands, "index": index, "player_stacks": this.player_stacks,})
}


}