class ServerCommunicator {
  basisURL;

  constructor(_url) {
    this.basisURL = _url;
  }

  getSensorData(verwerkingsFunctie) {
    var request = new XMLHttpRequest();
    request.open('GET', '/api/get/sensordata', true)
    request.onload = function () {
      if (request.status == 200) {
        verwerkingsFunctie(this.response);
      }
      else {
        console.log("server reageert niet zoals gehoopt");
        console.log(this.response);
      }
    }

    // verstuur het request
    request.send()
  }

  

}

