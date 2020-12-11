//Connecting to the MongoDB 
const DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://mongo:27017';
}

DataAccess.prototype.GetAllOrders = async function (databaseName, collectionName){
    var that = this;
    try {
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var orders_database = await response.db(databaseName);
        var collection = await orders_database.collection(collectionName);
        const item = await collection.find();
        const documents = await item.toArray();
        return documents;
    }catch(err){
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database ORDERS has failed';
        }
        return err;
    }
};


DataAccess.prototype.AddOrder = async function (databaseName, collectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var orders_database = await response.db(databaseName);
        var databaseres = await orders_database.collection(collectionName).insertOne(data);
        if(databaseres.result.ok){
            return databaseres.result.ok;
        }else{
            return String("Error: Couldn't add order");
        }
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database ORDERS has failed';
        }
        return err;
    }
};


module.exports = new DataAccess(); 