var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var model = require('./models/productModel');
var mqtt = require('mqtt');
var app = express();

var client = mqtt.connect('mqtt://192.168.16.9:1883')


client.on('connect', function () {
    console.log("MQTT Connection : Successful");
    client.subscribe('MoviesServices', function (err) {
        console.log("MQTT Subscription : Successful");
        if(err){
            console.log("error");
        }
    })
})


client.on('message', function (topic, message) {
    console.log(JSON.parse(message.toString()));
    console.log(typeof(JSON.parse(message.toString())));
    let message2 = JSON.parse(message.toString());
    model.OrderMovie(message2.movieName);
})


app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res, next) => {
    res.send("Route to Products Microservice");
});

app.get("/allMovies", async (req, res, next) => {
    try{
        const response = await model.GetAllProducts();
        res.send(response);
    }catch(err){
        res.send(err);
    }
});

app.get('/databaseInit', async (req, res, next) => {
    var movies = [
        {
            "_id": "5d92ffe677d6510df5fc2dcb",
            "name": "Movie1",
            "producer": "Producer1",
            "price": 15,
            "status": 0
        },
        {
            "_id": "5d92fffe77d6510df5fc2dcc",
            "name": "Movie2",
            "producer": "Producer2",
            "price": 18,
            "status": 0
        },
        {
            "_id": "5d93000777d6510df5fc2dcd",
            "name": "Movie3",
            "producer": "Producer3",
            "price": 16,
            "status": 0
        },
    ];
    try{
        const response = model.AddMovie(movies);
        res.send(response);
    }catch(err){
        res.send(err);
    }
});


var server = app.listen(8084, function(){
    console.log("The server is running on port:", 8084);
});


app.get('/healthCheck', function (req, res) {
    var status = {
        success: true,
        "name": "Products Microservice",
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
});
