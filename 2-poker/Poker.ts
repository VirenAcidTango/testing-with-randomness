import { Card } from "./Card";
import { Deck } from "./Deck";
import { Player } from "./Player";
import { Rank } from "./Rank";
import { Suit } from "./Suit";

export class Poker {
  private constructor(
    private players: Player[],
    private cardsAmount: number,
    private deck: Deck
  ) {}

  static create(players: string[], cardsAmount: number) {
    const pokerDeck = [];
    for (const suit of Object.values(Suit)) {
      for (const rank of Object.values(Rank)) {
        pokerDeck.push({ suit, rank });
      }
    }
    const deck = Deck.create(pokerDeck);

    const playersWithScore = players.map((player) => Player.create(player));

    return new Poker(playersWithScore, cardsAmount, deck);
  }

  play() {
    this.deck.shuffle();

    // Deal cards to players
    this.players.forEach((player) =>
      player.dealHand(this.deck, this.cardsAmount)
    );
    const playerCards = this.dealCards(this.players, this.cardsAmount);

    // Evaluate each player's hand
    const playerRanks: { player: Player; rank: Rank }[] = [];
    for (const player of this.players) {
      const rank = player.evaluateHand();
      playerRanks.push({ player, rank });
    }

    // Determine the winner
    const firstPlayerRank = playerRanks[0];
    let winner = firstPlayerRank.player;
    let winningRank = firstPlayerRank.rank;

    for (let index = 1; index < playerRanks.length; index++) {
      const player = playerRanks[index].player;
      const rank = playerRanks[index].rank;

      if (rank > winningRank) {
        winner = player;
        winningRank = rank;
      } else if (rank === winningRank) {
        // In case of a tie, the player with the higher card wins
        const winnerCards = playerCards.get(winner as Player) || [];
        const otherCards = playerCards.get(player) || [];
        if (winnerCards.length > 0 && otherCards.length > 0) {
          const winnerHighCard = winnerCards[winnerCards.length - 1].rank;
          const playerHighCard = otherCards[otherCards.length - 1].rank;
          if (playerHighCard > winnerHighCard) {
            winner = player;
            winningRank = rank;
          }
        }
      }
    }

    winner.increaseScore();
    return { winner, players: this.players };
  }

  private dealCards(
    players: Player[],
    cardsAmount: number
  ): Map<Player, Card[]> {
    const playerCards = new Map<Player, Card[]>();
    for (const player of players) {
      playerCards.set(player, []);
    }
    for (let i = 0; i < cardsAmount; i++) {
      for (const [_, cards] of playerCards) {
        const card = this.deck.draw();
        if (card) {
          cards.push(card);
        }
      }
    }
    return playerCards;
  }
}
