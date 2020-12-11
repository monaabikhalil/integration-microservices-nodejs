var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var model = require('./models/customerModel');
var mqtt = require('mqtt');

var app = express();

app.use(cors());
app.use(bodyParser.json());


var client = mqtt.connect('mqtt://192.168.16.9:1883')

client.on('connect', function () {
    console.log("MQTT Connection: Successful")
    client.subscribe('MoviesServices', function (err) {
        console.log("MQTT Subscription: Successful");
        if(err){
            console.log("error");
        }
    })
})

client.on('message', function (topic, message) {
    console.log(JSON.parse(message.toString()));
    console.log("got a msg");
    console.log(typeof(JSON.parse(message.toString())));
    let message2 = JSON.parse(message.toString());
    model.AddMovieToCustomer(message2.ClientName, message2.movieName);
})


app.get('/', async (req, res, next) => {
    res.send("Route to Customers Microservice");
});

app.get("/allCustomers", async (req, res, next) => {
    try{
        const response = await model.GetAllCustomers();
        res.send(response);
    }catch(err){
        res.send(err);
    }
});

app.post('/addCustomer', async function(req, res){
    var customer = {
        "name": req.body.name,
        "emailAddress": req.body.emailAddress,
        "location": req.body.location,
        "movie": req.body.movie
    };
    console.log("Customer: ", req.body);
    try{
        var document = await model.AddCustomer(customer);
        res.send(document);
    }catch(err){
        res.send(err);
    }
});


var server = app.listen(8082, function(){
    console.log("The server is running on port:", 8082);
});


app.get('/healthCheck', function (req, res) {
    var status = {
        success: true,
        "name": "Customers Microservice",
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
});
