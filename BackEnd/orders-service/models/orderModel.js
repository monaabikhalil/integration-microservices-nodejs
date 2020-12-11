var DataAccess = require('../controllers/dataController');

var http = require("http");
const request = require("request");

const Model = function(){
    this.databaseName = 'orders-database';
    this.collectionName = 'orders-collection'
};

Model.prototype.GetAllOrders = async function(){
    let that = this;
    try{
        var response = await DataAccess.GetAllOrders(that.databaseName, that.collectionName);
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.AddOrder = async function(order) {
    let that = this;
    try {
      var response = await DataAccess.AddOrder(that.databaseName, that.collectionName, order);
      if (response) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };


Model.prototype.CallAPI = async function(order) {
    console.log(order);
    return new Promise(function(fulfill, reject) {
    const data = JSON.stringify(order);
    const options = {
        hostname: '192.168.99.100',
        port: 8080,
        path: '/receiveOrder',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        };
    var request = http.request(options, (res) =>{
        console.log(`statusCode: ${res.statusCode}`)
        res.on('data', d => {
            console.log(d);
            })
    });
    request.write(data);
    request.end(() => fulfill(true));

    });
};

module.exports = new Model();