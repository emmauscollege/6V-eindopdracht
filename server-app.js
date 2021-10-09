const express = require('express');
const { maxHeaderSize } = require('http');
const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const app = express()
const port = 3000

var db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, databaseConnectCompletion);


app.use(express.static(path.join(__dirname, '/widget')));

app.get('/', geefWidget)
app.get('/api/echo', echoRequest)
app.get('/api/set/nieuwerun', creeerNieuweRun);
app.get('/api/set/sensordata', setSensorData);
app.get('/api/get/sensordata', getSensorData);
app.get('/api/set/instellingen', setInstellingen);
app.get('/api/get/instellingen', getInstellingen);


app.listen(port, serverIsGestart)


// wordt uitgevoerd nadat database een connectie
// probeert te maken
function databaseConnectCompletion(error) {
  if (error == null) {
    console.log('Verbonden met de database.');
  }
  else {
    console.error('Fout bij verbinden met database.')
    console.error(error.message);
  }

}


// wordt uitgevoerd als de server is opgestart
function serverIsGestart() {
  var url = process.env.GITPOD_WORKSPACE_URL
  console.log(`De server is opgestart en is bereikbaar op ${url}:${port}`)
}


// stuurt het html-bestand van de widget
function geefWidget(request, response) {
  response.redirect('index.html');
}

// stuurt de variabelen uit het request
// terug naar de browser en in de console
function echoRequest(request, response) {
  response.send(request.query)
}

// maakt een nieuwe run aan in de database
// en geeft een oké terug
function creeerNieuweRun(request, response) {
  // insert een nieuwe regel in de tabel 'runs' waarin we alleen de huidige tijd (timestamp) meegeven
  db.run("INSERT INTO runs (stamp) VALUES (CURRENT_TIMESTAMP)", stuurAanpassingsResultaat(response))
}

// geeft laatste sensordata van de run terug 
function getSensorData(request, response) {
  var runID = geefHoogsteRunID();
  db.all("SELECT SUM(aantalKnikkers) as knikkers FROM sensorData WHERE run = ?", [runID], stuurZoekResultaat(response))
}

// slaat doorgegeven data op in de database
function setSensorData(request, response) {
  var aantalNieuweKnikkers = request.query.knikkers
  var huidigeRunID = geefHoogsteRunID()
  var SQL = `INSERT INTO sensorData (run, stamp, aantalKnikkers)
              VALUES (?, CURRENT_TIMESTAMP, ?)`
  db.run(SQL, [aantalNieuweKnikkers, huidigeRunID], stuurAanpassingsResultaat(response))
}

// geeft de laatst ingevoerde instellingen terug
function getInstellingen(request, response) {
  // haal de laatst opgeslagen instellingen op
  // db.get geeft alleen het eerste resultaat
  db.get("SELECT * FROM instellingen ORDER BY id DESC", [], stuurZoekResultaat(response))
}

// slaat doorgegeven instellingen op in de database
function setInstellingen(request, response) {
  var huidigeRunID = geefHoogsteRunID();
  var wachttijd = request.query.wachttijd;
  var SQL = `INSERT INTO instellingen (run, stamp, wachttijd)
             VALUES (? , CURRENT_TIMESTAMP, ?)`;
  db.run(SQL, [huidigeRunID, wachttijd], stuurAanpassingsResultaat(response));
}


function stuurZoekResultaat(response) {
  function returnFunction (error, data) {
    if (error == null) {    // alles ging goed
      console.log(JSON.stringify(data, null, 2))
      response.status(200).send(data)
    }
    else {                  // er trad een fout op bij de database
      console.error(`Fout bij opvragen gegevens:` + error)
      response.status(400).send(error)
    }
  }

  return returnFunction;
}


function stuurAanpassingsResultaat(response) {
  function returnFunction (error) {
    if (error == null) {    // alles ging goed
      response.status(200).send()
    }
    else {                  // er trad een fout op bij de database
      console.error(`Fout bij aanpassen database:` + error)
      response.status(400).send(error)
    }
  }

  return returnFunction;
}

function geefHoogsteRunID() {
  db.get("SELECT max(id) as id FROM runs", [], (error, data) => {
    if (error) {
      throw error
    }
    return data.id;
  })
}