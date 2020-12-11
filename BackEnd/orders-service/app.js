var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var model = require('./models/orderModel');
var mqtt = require('mqtt');

var app = express();


app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res, next) => {
    res.send("Route to Orders Microservice");
});


app.get("/allOrders", async (req, res, next) => {
    try{
        const response = await model.GetAllOrders();
        res.send(response);
    }catch(err){
        res.send(err);
    }
});

app.post('/addOrder', async function(req, res){
    var order = {
        "movieName": req.body.movieName,
        "customerID": req.body.customerID,
        "date": req.body.date,
    };
    var orderDatabase_response = await model.AddOrder(order);
    if(orderDatabase_response){
        var API_response = await model.CallAPI(order);
        if(API_response){
            res.send("Call to API Done");
        }
    }

});


var server = app.listen(8083, function(){
    console.log("The server is running on port:", 8083);
});


app.get('/healthCheck', function (req, res) {
    var status = {
        success: true,
        "name": "Orders Microservice",
        address: server.address().address,
        port: server.address().port,
    };
    res.send(status);
});
