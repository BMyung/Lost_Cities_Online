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
        var all_hands = [];
        var string = ["Wager1", "Wager2", "Wager3","Two", "Three", "Four","Five", "Six",  "Seven", "Eight", "Nine", "Ten"];
        var color = ["white", "red", "green", "blue", "yellow"];
        var val = [0,0,0,2,3,4,5,6,7,8,9,10]
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 12; j++) {
              var newCard = {"num": string[j],
                "color": color[i],
                "val": val[j],
                "id": color[i] + "_" + string[j]};
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
              this.all_hands=[[],[]];
              for (var i = 0; i < 2; i++){
                for (var k = 0; k < 8; k++){
                  this.all_hands[i][k] = this.deck[0];
                  this.deck.shift()
                }
            }
            // console.log(this.deck)
              io.emit("new", {"all_hands": this.all_hands,
                    "deck": this.deck});
            });
    socket.on("select", data => {
        if (data.action != null){ 
    var hand_no = this.player_id -1
    if (data.action == "discard"){
    data.discard[data.card.color].push(data.card)
    }
    else if (data.action == "play"){
        console.log()
        data.player_stacks[0].push(data.card)
        console.log(data.player_stacks)
    }
    data.all[0].splice(data.index, 1)
    data.action = null;
}
    io.emit("update",{
        "discard": data.discard,
        "action": data.action,
        "all": data.all,
        "test":test
    })


})
});
