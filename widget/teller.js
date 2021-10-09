class Teller {
  x;
  y;
  aantal;

  constructor(_x, y) {
    this.x = _x;
    this.y = _y;
    this.aantal = 0;
  }

  show() {
    noStroke();         // geen rand
    fill(0, 0, 0);      // zwart

    // print aantal knikkers bovenin
    text(aantal, this.x, this.y);
  }
  
}