import { Card } from "./Card";
import { Rank } from "./Rank";

export class Hand {
  private constructor(private cards: Card[]) {}

  static create(cards: Card[]) {
    return new Hand(cards);
  }

  add(card: Card) {
    this.cards.push(card);
  }

  cardsAmount() {
    return this.cards.length;
  }

  // Evaluate the rank of a hand of cards
  evaluate(): Rank {
    // Sort the cards by rank
    const sortedCards = this.cards.sort((a, b) => {
      const rankA = Object.values(Rank).indexOf(a.rank);
      const rankB = Object.values(Rank).indexOf(b.rank);
      return rankA - rankB;
    });

    // Check for a straight flush
    if (this.hasStraightFlush(sortedCards)) {
      return Rank.ACE;
    }

    // Check for four of a kind
    if (this.hasFourOfAKind(sortedCards)) {
      return Rank.KING;
    }

    // Check for a full house
    if (this.hasFullHouse(sortedCards)) {
      return Rank.QUEEN;
    }

    // Check for a flush
    if (this.hasFlush(sortedCards)) {
      return Rank.JACK;
    }

    // Check for a straight
    if (this.hasStraight(sortedCards)) {
      return Rank.TEN;
    }

    // Check for three of a kind
    if (this.hasThreeOfAKind(sortedCards)) {
      return Rank.NINE;
    }

    // Check for two pairs
    if (this.hasTwoPairs(sortedCards)) {
      return Rank.EIGHT;
    }

    // Check for a pair
    if (this.hasOnePair(sortedCards)) {
      return Rank.SEVEN;
    }

    // Otherwise, return the rank of the highest card
    return sortedCards[sortedCards.length - 1].rank;
  }

  // Helper to check for a straight flush
  private hasStraightFlush(cards: Card[]): boolean {
    return this.hasFlush(cards) && this.hasStraight(cards);
  }

  // Helper to check for four of a kind
  private hasFourOfAKind(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(4);
  }

  // Helper to check for a full house
  private hasFullHouse(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return (
      Object.values(counts).includes(3) && Object.values(counts).includes(2)
    );
  }

  // Helper to check for a flush
  private hasFlush(cards: Card[]): boolean {
    return cards.every((card, _, array) => card.suit === array[0].suit);
  }

  // Helper to check for a straight
  private hasStraight(cards: Card[]): boolean {
    for (let i = 0; i < cards.length - 1; i++) {
      const rankA = Object.values(Rank).indexOf(cards[i].rank);
      const rankB = Object.values(Rank).indexOf(cards[i + 1].rank);
      if (rankA + 1 !== rankB) {
        return false;
      }
    }
    return true;
  }

  // Helper to check for three of a kind
  private hasThreeOfAKind(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(3);
  }

  // Helper to check for two pairs
  private hasTwoPairs(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).filter((count) => count === 2).length === 2;
  }

  // Helper to check for a pair
  private hasOnePair(cards: Card[]): boolean {
    const counts = this.countByRank(cards);
    return Object.values(counts).includes(2);
  }

  // Helper to count the number of cards with each rank
  private countByRank(cards: Card[]): Record<Rank, number> {
    const counts: Record<Rank, number> = {
      [Rank.ACE]: 0,
      [Rank.TWO]: 0,
      [Rank.THREE]: 0,
      [Rank.FOUR]: 0,
      [Rank.FIVE]: 0,
      [Rank.SIX]: 0,
      [Rank.SEVEN]: 0,
      [Rank.EIGHT]: 0,
      [Rank.NINE]: 0,
      [Rank.TEN]: 0,
      [Rank.JACK]: 0,
      [Rank.QUEEN]: 0,
      [Rank.KING]: 0,
    };

    cards.forEach((card) => {
      counts[card.rank]++;
    });

    return counts;
  }
}
