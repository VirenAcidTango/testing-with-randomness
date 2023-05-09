export class Die {
  constructor(private sides: number) {}

  roll() {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
