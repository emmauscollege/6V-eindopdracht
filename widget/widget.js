class Widget {
  // private attributen
  knikkerTellerBoven = 0;
  UPDATE_INTERVAL = 5000;
  button;

  serverCommunicator = new ServerCommunicator();

  constructor() {
    this.knikkerTellerBoven = 0;
    this.UPDATE_INTERVAL = 5000;

    // maak een button en stel deze in
    
    setInterval(this.vraagSensorData.bind(this), this.UPDATE_INTERVAL);
  }

  /**
   * setup
   * de code in deze functie wordt eenmaal uitgevoerd,
   * als p5js wordt gestart
   */
  setup() {
    // Maak het canvas van je widget
    createCanvas(300, 600);

    this.button = createButton('Verstuur');
    this.button.position(200, 575);
    this.button.mouseClicked(this.stuurInstellingen);
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
    strokeWeight(15);
    line(50, 20, 140, 80);
    line(250, 20, 160, 80);
  }

  vraagSensorData() {
    this.serverCommunicator.getSensorData(this.verwerkNieuweSensorData.bind(this));
  }

  verwerkNieuweSensorData(data) {
    this.knikkerTellerBoven = data.knikkers;
  }

  stuurInstellingen() {

  }



}