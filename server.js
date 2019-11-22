const Express = require("express")();
const Http = require("http").Server(Express);
const io = require("socket.io")(Http);

Http.listen(8000, () => {
  console.log("Listening at :8000...");
});

player_action = null;
player_stacks = [{
  "red": [],
  "green": [],
  "blue": [],
  "white": [],
  "yellow": []
},
{
  "red": [],
  "green": [],
  "blue": [],
  "white": [],
  "yellow": []
}];
discard_stacks = {
  "red": [],
  "green":[],
  "blue": [],
  "white":[],
  "yellow":[]
};

all_hands = [[], []];
deck = [];
active_player = null;
players = ["1", "2"];
player_id = 0;
card = {
  num: String,
  color: String,
  id: String,
  val: Number
};

function reset(){
  all_hands = [[], []];
  deck = [];
  active_player = null;
  player_action = null;
  player_stacks = [{
  "red": [],
  "green": [],
  "blue": [],
  "white": [],
  "yellow": []
},
{
  "red": [],
  "green": [],
  "blue": [],
  "white": [],
  "yellow": []
}];
discard_stacks = {
  "red": [],
  "green":[],
  "blue": [],
  "white":[],
  "yellow":[]
};
}
io.on("connection", socket => {
  socket.emit("message", socket.id);
  socket.on("new", () => {
    console.log("new game")
    reset();
    var string = ["Wager1", "Wager2", "Wager3", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
    var color = ["white", "red", "green", "blue", "yellow"];
    var val = [0, 0, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 12; j++) {
        var newCard = {
          "num": string[j],
          "color": color[i],
          "val": val[j],
          "id": color[i] + "_" + string[j]
        };
        deck.push(newCard);
      }
    }
    var m = deck.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = deck[m];
      deck[m] = deck[i];
      deck[i] = t;
    }
    for (var i = 0; i < 2; i++) {
      for (var k = 0; k < 8; k++) {
        all_hands[i][k] = deck[0];
        deck.shift()
      }
    }
    io.emit("new_game", {
      "all_hands": all_hands,
      "deck": deck, 
      "p_action": player_action,
      "discard": discard_stacks
    });
  });
  socket.on("selectCard", data => {
      if(data.action == "discard"){
        discard_stacks[data.card.color].push(data.card)
      }
      else if (data.action == "play"){
        player_stacks[0][data.card.color].push(data.card)
        console.log(player_stacks)
      }
      all_hands[0].splice(data.index, 1)
      player_action = "draw";
    // }
    io.emit("update", {
      "discard": discard_stacks,
      "action": player_action,
      "all": all_hands,
      "player": player_stacks
    })


  })
});
