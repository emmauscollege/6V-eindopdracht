const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const port = 3000

var db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE, databaseConnectCompletion);


app.use(express.static('/website-bestanden'))

app.get('/', geefWidget)
app.get('/api/echo', echoRequest)
app.get('/api/set/nieuwerun', creeerNieuweRun);
app.get('/api/set/sensordata', setSensorData);
app.get('/api/get/sensordata', getSensorData);
app.get('/api/set/instellingen', setInstellingen);
app.get('/api/get/instellingen', getInstellingen);


app.listen(port, serverStartCompletion)

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
function serverStartCompletion() {
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
  db.all("dit is de query", [], function (error, rows) {
    if (error != undefined) {
      throw error
    }

    response.send(JSON.stringify(rows));
  })
}

// geeft laatste sensordata van de run terug 
function getSensorData(request, response) {
  
}

// slaat doorgegeven data op in de database
function setSensorData(request, response) {
  
}

// geeft de laatst ingevoerde instellingen terug
function getInstellingen(request, response) {
  
}

// slaat doorgegeven instellingen op in de database
function setInstellingen(request, response) {

}

function opvragenDatabase(sql, parameters = []) {
  var result = null;
  db.all(sql, parameters, function (error, rows) {
    if (error == null) {
      result = rows;
    }
    else {
      console.error(`Fout bij uitvoeren van ${sql}:\n` + error)
    }
  })

  return result;
}

function aanpassenDatabase(sql, parameters = []) {
  db.run(sql, parameters, function (error) {
    if (error == null) {
      console.log('Database succesvol aangepast')
    }
    else {
      console.log(`Fout bij uitvoeren van ${sql}:\n` + error)
    }
  })
}