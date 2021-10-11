
// globale variabelen
var aantalKnikkersBoven = 0;    // aantal knikkers dat bovenin is binnengekomen
var wachttijd = 15;             // wachttijd voor het poortje in seconden
const UPDATE_INTERVAL = 5000;   // tijd in milliseconden tussen het door widget opvragen van gegevens
var button;
var teller;
var wachtijdInput;


/**
 * setup
 * de code in deze functie wordt eenmaal uitgevoerd,
 * als p5js wordt gestart
 */
function setup() {
  // Maak het canvas van je widget
  createCanvas(300, 600);

  teller = new Teller(150, 50);

  // maak een button en stel deze in
  button = createButton('Verstuur');
  button.position(250, 575);
  button.mouseClicked(stuurNieuweInstellingen);

  wachtijdInput = createInput();
  wachtijdInput.position(225, 70);
  wachtijdInput.size(50);

  // om de ... milliseconden wordt 'vraagSensorData' uitgevoerd
  setInterval(vraagSensorData, UPDATE_INTERVAL);
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
  strokeWeight(10);
  line(50, 20, 135, 60);
  line(250, 20, 165, 60);

  teller.aantal = aantalKnikkersBoven;
  teller.show();
}


// stuurt een verzoek aan de server dat alle
// sensordata opvraat
function vraagSensorData() {
  var request = new XMLHttpRequest();

  // maak een http-verzoek
  request.open('GET', '/api/get/sensordata', true)

  // wat uitvoeren als het antwoord teruggegeven wordt?
  request.onload = function () {
    var data = request.response;

    if (request.status == 200) {
      console.log("Dit geeft de server terug:" + data);
      knikkerTellerBoven = data.knikkers;
    }
    else {
      console.log("server reageert niet zoals gehoopt");
      console.log(request.response);
    }
  }

  // verstuur het request
  request.send()
}


// stuurt een http-verzoek aan de server met de
// nieuwe instellingen
function stuurNieuweInstellingen() {
  var request = new XMLHttpRequest();

  // maak een http-verzoek
  request.open('GET', '/api/set/instellingen?wachttijd=' + wachtijdInput.value(), true)

  // wat uitvoeren als het antwoord teruggegeven wordt?
  request.onload = function () {
    if (request.status == 200) {
      // geeft positieve feedback in widget ofzo
      console.log("Server accepteerde instellingen.")
    }
    else {
      console.log("server reageert niet zoals gehoopt.");
      console.log(request.response);
    }
  }

  // verstuur het request
  request.send()
}