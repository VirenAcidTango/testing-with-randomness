import { Card } from "./Card";
import { CardDealer } from "./CardDealer";
import { Deck } from "./Deck";
import { HandCombination } from "./HandCombination";
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

    // Evaluate each player's hand
    const playerCombinations: {
      player: Player;
      handCombination: HandCombination;
    }[] = [];
    for (const player of this.players) {
      const combination = player.evaluateHand();
      playerCombinations.push({ player, handCombination: combination });
    }

    // Determine the winner
    const firstPlayerCombination = playerCombinations[0];
    let winner = firstPlayerCombination.player;
    let winningCombination = firstPlayerCombination.handCombination;

    for (let index = 1; index < playerCombinations.length; index++) {
      const player = playerCombinations[index].player;
      const combination = playerCombinations[index].handCombination;

      const combinationPriority = Poker.COMBINATION_PRIORITY[combination];
      const winningCombinationPriority =
        Poker.COMBINATION_PRIORITY[winningCombination];
      if (combinationPriority > winningCombinationPriority) {
        winner = player;
        winningCombination = combination;
      } else if (combination === winningCombination) {
        // In case of a tie, the player with the higher card wins
        const winnerCards = winner.getHand().getCards();
        const otherCards = player.getHand().getCards();
        if (winnerCards.length > 0 && otherCards.length > 0) {
          const winnerHighCard = winnerCards[winnerCards.length - 1].rank;
          const playerHighCard = otherCards[otherCards.length - 1].rank;
          if (playerHighCard > winnerHighCard) {
            winner = player;
            winningCombination = combination;
          }
        }
      }
    }

    const isWinningCombinationStraightFlush =
      winningCombination == HandCombination.STRAIGHT_FLUSH;

    winner.increaseScore();
    if (
      winner.getPreviousMatchStraightFlush() &&
      isWinningCombinationStraightFlush
    ) {
      winner.doublePoints();
    }
    winner.setPreviousMatchStraightFlush(isWinningCombinationStraightFlush);
    return { winner, players: this.players };
  }

  getPlayers() {
    return this.players;
  }

  static COMBINATION_PRIORITY: Record<HandCombination, number> = {
    straight_flush: 8,
    four_of_a_kind: 7,
    full_house: 6,
    flush: 5,
    straight: 4,
    three_of_a_kind: 3,
    two_pair: 2,
    pair: 1,
    high_card: 0,
  };
}
