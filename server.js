const Express = require("express")();
const Http = require("http").Server(Express);
const io = require("socket.io")(Http);

Http.listen(8000, () => {
    console.log("Listening at :8000...");
});


io.on("connection", socket => {
    socket.emit("message", {message: "hello"});
    socket.on("new", () => { 
        console.log("new game")
        this.deck = [];
        this.players=["1","2","3"]
        var all_hands = [];
        var string = ["One", "One", "One","Two", "Two", "Three","Three", "Four",  "Four", "Five"];
        var color = ["white", "red", "green", "blue", "yellow"];
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++) {
              var newCard = {"num": string[j],
               "color": color[i]};
                this.deck.push(newCard);
            }
        }
        var m = this.deck.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
        }
              this.all_hands=[[],[],[]];
              for (var i = 0; i < this.players.length; i++){
                for (var k = 0; k < 5; k++){
                  this.all_hands[i][k] = this.deck[0];
                  this.deck.shift()
                }
            }
            console.log(this.deck)
              io.emit("all_hands", this.all_hands)
              io.emit("deck", this.deck)
          }
    );
});

