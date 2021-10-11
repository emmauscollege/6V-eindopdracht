class Widget {
  // private attributen
  aantalKnikkersBoven;    // aantal knikkers dat bovenin is binnengekomen
  wachttijd;              // wachttijd voor het poortje in seconden
  UPDATE_INTERVAL;        // tijd in milliseconden tussen het door widget opvragen van gegevens
  button;
  teller;
  wachtijdInput;

  constructor() {
    // standaardwaarden ingeven
    this.aantalKnikkersBoven = 0;
    this.wachttijd = 15;
    this.UPDATE_INTERVAL = 5000;

    // om de ... milliseconden wordt 'vraagSensorData' uitgevoerd
    setInterval(this.vraagSensorData, this.UPDATE_INTERVAL);
  }


  /**
   * setup
   * de code in deze functie wordt eenmaal uitgevoerd,
   * als p5js wordt gestart
   */
  setup() {
    // Maak het canvas van je widget
    createCanvas(300, 600);

    this.teller = new Teller(150, 50);

    // maak een button en stel deze in
    this.button = createButton('Verstuur');
    this.button.position(250, 575);
    this.button.mouseClicked(this.stuurNieuweInstellingen);

    this.wachtijdInput = createInput();
    this.wachtijdInput.position(225, 70);
    this.wachtijdInput.size(50);
  }


  /**
   * draw
   * de code in deze functie wordt meerdere keren per seconde
   * uitgevoerd door de p5 library, nadat de setup functie klaar is
   */
  draw() {
    // schrijf hieronder de code van je widget
    // hieronder wordt schematisch een knikkerbaan getekend

    // achtergrond: houtkleur, kies gerust iets anders
    background(175, 144, 105);

    // twee dikke strepen als 'opvangbak'
    stroke(0, 0, 0);
    strokeWeight(10);
    line(50, 20, 135, 60);
    line(250, 20, 165, 60);

    this.teller.aantal = this.aantalKnikkersBoven;
    this.teller.show();
  }


  // stuurt een verzoek aan de server dat alle
  // sensordata opvraat
  vraagSensorData() {
    var request = new XMLHttpRequest();

    // maak een http-verzoek
    request.open('GET', '/api/get/sensordata', true)

    // wat uitvoeren als het antwoord teruggegeven wordt?
    request.onload = function () {
      var data = request.response;

      if (request.status == 200) {
        console.log("Dit geeft de server terug:" + data);
        this.knikkerTellerBoven = data.knikkers;
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
  stuurNieuweInstellingen() {
    var request = new XMLHttpRequest();

    // maak een http-verzoek
    request.open('GET', '/api/set/instellingen?wachttijd=' + this.wachtijd, true)

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
}