//    Encapsulation Symbols
const _count = Symbol('count');
const _isFaceCard = Symbol('isFaceCard');
const _wins = Symbol('wins');


class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this[_isFaceCard] = this.rank === 1 || this.rank > 10 ? true : false;
    }

    get isFaceCard() {
        return this[_isFaceCard];
    }

    toString() {
        let result = '';
        if (this.rank >= 1 && this.rank <= 13) {
            if (this.isFaceCard === true) {
                switch (this.rank) {
                    case 1: {
                        result += 'Ace';
                        break;
                    }
                    case 11: {
                        result += 'Jack';
                        break;
                    }
                    case 12: {
                        result += 'Queen';
                        break;
                    }
                    case 13: {
                        result += 'King';
                        break
                    }
                    default:
                        break;
                }
            } else {
                result += this.rank;
            }

            result += ' of ' + this.suit;
        } else {
            console.error('No or wrong information about card!');
        }
        return result;
    }

    static compare(cardOne, cardTwo) {
        if (cardOne > cardTwo) {
            return true;
        } else if (cardOne < cardTwo) {
            return false;
        } else {
            return 'equel';
        }
    }
}

class Deck {
    constructor() {
        this.cards = this.createDeck();
        this[_count] = this.cards.length;
    }

    get count() {
        return this[_count];
    }

    shuffle() {
        let rand,
            temp;
        for (let i = this.cards.length - 1; i > 0; i--) {
            rand = Math.floor(Math.random() * (i + 1));
            temp = this.cards[rand];
            this.cards[rand] = this.cards[i];
            this.cards[i] = temp;
        }
    }

    draw(n = 1) {
        let result = [];
        for (let i = 0; i < n; i++) {
            result.push(this.cards[this.cards.length - (i + 1)]);
        }
        this.cards.splice(this.cards.length - n, n);
        this[_count] = this.cards.length;

        return result;
    }

    // Function which create deck of Cards and return this Array
    // Used when we initialize property 'cards'

    createDeck() {
        let deck = [],
            suit = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

        suit.forEach((sign) => {
            for (let i = 1; i < 14; i++) {
                deck.push(new Card(sign, i));
            }
        });
        return deck;
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this[_wins] = 0;
        this.deck = new Deck();
    }

    get wins() {
        return this[_wins];
    }

    static play(playerOne, playerTwo) {
        if (playerOne.deck.cards.length === 52 && playerTwo.deck.cards.length === 52) {

            playerOne.deck.shuffle();
            playerTwo.deck.shuffle();

            while (playerOne.deck.count && playerTwo.deck.count) {
                const cardOne = playerOne.deck.draw();
                const cardTwo = playerTwo.deck.draw();

                switch (Card.compare(cardOne, cardTwo)) {
                    case true:
                        playerOne[_wins]++;
                        break;
                    case false:
                        playerTwo[_wins]++;
                        break;
                    case 'equel':
                        break;
                }
            }

            if (playerOne.wins > playerTwo.wins) {
                console.log(`${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`);
            } else if (playerOne.wins < playerTwo.wins) {
                console.log(`${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`);
            } else {
                console.log('A Draw');
            }

            Player.refreshGame(playerOne, playerTwo);

        } else {
            console.error('Decks is not full');
        }
    }

    static refreshGame(playerOne, playerTwo) {
        playerOne.deck = new Deck();
        playerTwo.deck = new Deck();
        playerOne[_wins] = 0;
        playerTwo[_wins] = 0;
    }
}

// const playerOne = new Player('Ivan');
// const playerTwo = new Player('Vasyl');

// Player.play(playerOne, playerTwo);