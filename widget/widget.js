// globale variabelen
var knikkerTellerBoven = 0;
const UPDATE_INTERVAL = 5000;


/**
 * setup
 * de code in deze functie wordt eenmaal uitgevoerd,
 * als p5js wordt gestart
 */
function setup() {
  // Maak het canvas van je widget
  createCanvas(300, 600);

  // maak een button en stel deze in
  button = createButton('Verstuur');
  button.position(200, 575);
  button.mouseClicked(stuurInstellingen);
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // schrijf hieronder de code van je widget
  // hieronder wordt schematisch een knikkerbaan getekend

  // achtergrond: houtkleur, kies gerust iets anders
  background(175, 144, 105);

  // twee dikke strepen als 'opvangbak'
  stroke(0, 0, 0);
  strokeWeight(15);
  line(50, 20, 140, 80);
  line(250, 20, 160, 80);

  // rand even uitzetten
  noStroke();

  // print aantal knikkers bovenin
  text(knikkerTellerBoven, 150, 50);
}