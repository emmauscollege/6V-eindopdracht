var button;
var knikkerTellerBoven = 0;
const UPDATE_INTERVAL = 5000;


/**
 * checkForDatabaseUpdate
 * Controleert of de database wijzingen heeft waarvan wij nog niet weten.
 * Verdere actie vereist bij reponse "Update needed"
 */
function checkForDatabaseChanges() {
  // zet het serverrequest in elkaar
  var request = new XMLHttpRequest();
  request.open('GET', `/api/checkchanges/${laatsteUpdateTimeStamp}`, true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      if (this.response == "Update needed") {
        console.log("Server geeft aan dat de database een update heeft die widget nog niet heeft");

        // roep ander update functie(s) aan:
        getTotalPresses();
      }
      else {
        // je kunt de code hieronder aanzetten, maar krijgt dan wel iedere seconde een melding
        // console.log("Widget is up to date");
      }
    }
    else {
        console.log("bleh, server reageert niet zoals gehoopt");
        console.log(this.response);
      }
  }

  // verstuur het request
  request.send()
}

/**
 * getTotalPresses
 * Vraagt het totaal aantal buttonPresses op
 */
function getTotalPresses() {
  // zet het serverrequest in elkaar
  var request = new XMLHttpRequest()
  request.open('GET', '/api/getTotalPresses', true)
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(`Totaal aantal buttonPresses = ${data.totalbuttonpresses} `);
      numberOfButtonPresses = data.totalbuttonpresses;
      var newTimeStamp = new Date(data.lasttimestamp).getTime()+1;

      // update indien nodig de timestamp
      if (laatsteUpdateTimeStamp < newTimeStamp) {
        laatsteUpdateTimeStamp = newTimeStamp;
      }
      
    }
    else {
        console.log("bleh, server reageert niet zoals gehoopt");
        console.log(this.response);
      }
  }

  // verstuur het request
  request.send()
}


function stuurInstellingen() {
  // zet het serverrequest in elkaar
  var request = new XMLHttpRequest()
  request.open('GET', '/api/addButtonPress', true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      console.log('ButtonPress doorgegeven aan server');
    }
    else {
        console.log("bleh, server reageert niet zoals gehoopt");
        console.log(this.response);
      }
  }

  // verstuur het request
  request.send()
}


/**
 * setup
 * de code in deze functie wordt eenmaal uitgevoerd,
 * als p5js wordt gestart
 */
function setup() {
  // Maak het canvas van je widget
  createCanvas(300, 600);

  button = createButton('Verstuur');
  button.position(200, 575);
  button.mouseClicked(stuurInstellingen);


  // zet timeStamp op lang geleden zodat we alle recente info binnenkrijgen
  laatsteUpdateTimeStamp = new Date().setTime(0);

  // we vragen elke seconde of er iets is veranderd
  setInterval(checkForDatabaseChanges, UPDATE_INTERVAL);
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  // schrijf hieronder de code van je widget
  // nu wordt slechts een voorbeeld als plaatje getoond
  // verwijder deze achtergrond en creëer je eigen widget
  background(175, 144, 105);
  stroke(0, 0, 0);
  strokeWeight(15);
  line(50, 20, 140, 80);
  line(250, 20, 160, 80);

  noStroke();
  text(5, 150, 50);
}