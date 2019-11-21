import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from "socket.io-client";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  all_hands=[[],[],[]];
  private context: any;
  private socket: any;
  card = {
    num: String,
    color: String,
    id: String,
    val: Number
  }
  deck = []
  active_player = null;
  players=["1","2","3"]
  bombs = null;
  clocks = null;


  constructor() {}
  ngOnInit(){
this.socket = io("http://localhost:8000");
// this.reset()
this.bombs = 3;
this.clocks = 8;
this.active_player = this.players[0]
  }

  ngAfterViewInit() {
    this.socket.on("message", data => {
        console.log(data);
      });
    this.socket.on("all_hands", data =>{
      this.all_hands = data;
      this.socket.on("deck", deck_data =>{
        this.deck = deck_data
        console.log("TCL: AppComponent -> ngAfterViewInit -> deck_data", deck_data)
      })
    })
}
newGame(){
  this.socket.emit("new")
}

}
