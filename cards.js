class Card {
    constructor(color, num) {
        this.color = color;
        this.num = num;
    }
    show() {
        console.log(`The card has the ${this.suit} suit, the ${this.string_val} value and the ${this.num_val}`)
    }
}

class Deck {
    constructor() {
        this.reset();
    }


    reset() {
        this.deck = [];
        var string = ["One", "One", "One","Two", "Three", "Four", "Two", "Three", "Four", "Five"];
        var color = ["white", "red", "green", "blue", "yellow"];
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 10; j++) {
                var newCard = new Card(color[i], string[j]);
                this.deck.push(newCard);
            }
        }
        return this.deck
    }

    shuffle() {
        var m = this.deck.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this.deck[m];
            this.deck[m] = this.deck[i];
            this.deck[i] = t;
        }
    }

//     deal() {
//         console.log(this.deck[0])
//         var deal_card = this.deck[0];
//         this.deck.shift()
//         return deal_card
//     }


}
// class Player extends Deck {
//     constructor(name, hand) {
//         super();
//         this.name = name;
//         this.hand = [];
//         super.shuffle();
//         this.hand.push(super.deal());
//         this.hand.push(super.deal());
//         console.log(this.hand);
//     }
//     player_deal() {
//         this.hand.push(super.deal());
//     }

//     player_discard(value) {
//         this.hand.splice(value, 1)
//     }
// }

var new_deck = new Deck();
// var new_player = new Player('Bryan');
console.log(new_deck);
new_deck.shuffle();
console.log(new_deck)
