import { Card } from "./Card";
import { CardDealer } from "./CardDealer";
import { Poker } from "./Poker";
import { Rank } from "./Rank";
import { Suit } from "./Suit";

describe("Play Poker game", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("has two players with 5 cards each", () => {
    const player1 = "Player1";
    const player2 = "Player2";
    const poker = Poker.create([player1, player2], 5);

    const match = poker.play();

    expect(match.players.length).toEqual(2);
    match.players.forEach((player) => expect(player.cardsAmount()).toEqual(5));
  });

  it("doubles the points when getting two straight flushes in a row", () => {
    const DIAMOND_STRAIGHT_FLUSH: Card[] = [
      { suit: Suit.DIAMONDS, rank: Rank.SEVEN },
      { suit: Suit.DIAMONDS, rank: Rank.EIGHT },
      { suit: Suit.DIAMONDS, rank: Rank.NINE },
      { suit: Suit.DIAMONDS, rank: Rank.TEN },
      { suit: Suit.DIAMONDS, rank: Rank.JACK },
    ];
    const CLUBS_STRAIGHT_FLUSH: Card[] = [
      { suit: Suit.CLUBS, rank: Rank.SEVEN },
      { suit: Suit.CLUBS, rank: Rank.EIGHT },
      { suit: Suit.CLUBS, rank: Rank.NINE },
      { suit: Suit.CLUBS, rank: Rank.TEN },
      { suit: Suit.CLUBS, rank: Rank.JACK },
    ];
    const KINGS_PAIR: Card[] = [
      { suit: Suit.CLUBS, rank: Rank.KING },
      { suit: Suit.HEARTS, rank: Rank.JACK },
      { suit: Suit.SPADES, rank: Rank.TWO },
      { suit: Suit.SPADES, rank: Rank.THREE },
      { suit: Suit.DIAMONDS, rank: Rank.KING },
    ];
    const FIVE_PAIR: Card[] = [
      { suit: Suit.SPADES, rank: Rank.QUEEN },
      { suit: Suit.HEARTS, rank: Rank.FIVE },
      { suit: Suit.SPADES, rank: Rank.NINE },
      { suit: Suit.SPADES, rank: Rank.FIVE },
      { suit: Suit.DIAMONDS, rank: Rank.TEN },
    ];
    const player1Name = "Player1";
    const player2Name = "Player2";
    const cardsAmount = 5;
    const poker = Poker.create([player1Name, player2Name], cardsAmount);

    jest
      .spyOn(CardDealer, "deal")
      .mockReturnValueOnce(KINGS_PAIR)
      .mockReturnValueOnce(DIAMOND_STRAIGHT_FLUSH)
      .mockReturnValueOnce(FIVE_PAIR)
      .mockReturnValueOnce(CLUBS_STRAIGHT_FLUSH);

    const firstMatch = poker.play();

    expect(firstMatch.winner.getName()).toEqual(player2Name);
    expect(firstMatch.winner.getScore()).toEqual(1);

    const secondMatch = poker.play();

    expect(secondMatch.winner.getName()).toEqual(player2Name);
    expect(secondMatch.winner.getScore()).toEqual(4);
  });
});
