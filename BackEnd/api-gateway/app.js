var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var http = require('http');
var mqtt = require('mqtt');
var model = require('./models/apiGatewayModel');

var app = express();

app.use(cors());
app.use(bodyParser.json());


app.post("/receiveOrder", async function (req, res) {
    var client = mqtt.connect('mqtt://192.168.16.9:1883');
    client.on('connect', function () {
      console.log("MQTT Connection: Successful")
      client.subscribe('MoviesServices', function (err) {
        console.log("MQTT Subscription: Successful")
        var message = JSON.stringify(req.body);
        if (!err) {
          client.publish('MoviesServices', message)
        } else {
          console.log("error")
        }
      })
    })
    client.on('message', function (topic, message) {
      console.log(message.toString())
      res.send(message.toString())
      client.end()
    })
  });


app.get('/', async (req, res, next) => {
    res.send("Route to API Gateway");
});


app.get("/getStatus", async function (req, res) {
    let services = [
      {
        name: "Movies Microservice",
        url: "http://192.168.99.100",
        address: "192.168.99.100",
        port: 8084
      },
      {
        name: "Customers Microservice",
        url: "http://192.168.99.100",
        address: "192.168.99.100",
        port: 8082
      },
      {
        name: "Orders Microservice",
        url: "http://192.168.99.100",
        address: "192.168.99.100",
        port: 8083
      },
    ];
    var promises = await model.checkState(services);
    Promise.all(promises)
      .then(function (values) {
        for (var i = 0; i < values.length; i++) {
          var value = values[i];
          if (value.address && value.port) {
            for (var j = 0; j < services.length; j++) {
              if (services[j].address == value.address && services[j].port == value.port) {
                value.config = services[j];
              }
            }
          }
        }
        res.send(values);
      })
      .catch(function (err) {
        res.send(err);
      });
  });


app.get('/allMovies', async function (req, res) {
    const options = {
      hostname: '192.168.99.100',
      port: 8084,
      path: '/allMovies',
      method: 'GET'
    };
  
    http.get(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        res.send(JSON.parse(data));
      });
  
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});
  

app.get('/allCustomers', async function (req, res) {
    const options = {
      hostname: '192.168.99.100',
      port: 8082,
      path: '/allCustomers',
      method: 'GET'
    };
  
    http.get(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        res.send(JSON.parse(data));
      });
  
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});


app.post('/addCustomer', function(req, res){
    var customer = {
        "name": req.body.name,
        "emailAddress": req.body.emailAddress,
        "location": req.body.location,
        "movie": req.body.movie
    };
    const data = JSON.stringify(customer)
    const options = {
      hostname: '192.168.99.100',
      port: 8082,
      path: '/addCustomer',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    const requ = http.request(options, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        console.log(data)
        res.send(data);
      });
    })
    requ.on("error", (err) => {
      console.log("Error: " + err.message);
    });
    requ.write(data)
    requ.end()
});

var server = app.listen(8080, function(){
    console.log("The server is running on port:", 8080);
});