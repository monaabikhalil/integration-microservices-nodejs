//Connecting to the MongoDB 
const DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://192.168.99.100:27017';
}

DataAccess.prototype.GetAllProducts = async function (databaseName, collectionName){
    var that = this;
    try {
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var products_database = await response.db(databaseName);
        var collection = await products_database.collection(collectionName);
        const item = await collection.find();
        const documents = await item.toArray();
        return documents;
    }catch(err){
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database PRODUCTS has failed';
        }
        return err;
    }
};

DataAccess.prototype.AddProduct = async function (databaseName, collectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var products_database = await response.db(databaseName);
        products_database.collection(collectionName).insertMany(data ,function(err, res) {
            if (err) throw err;
            console.log("Documents inserted");
        });
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database PRODUCTS has failed';
        }
        return err;
    }
};

DataAccess.prototype.ChangeState = async function (databaseName, collectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var products_database = await response.db(databaseName);
        products_database.collection(collectionName).updateOne(
            { "name" : data },
            { $set: { "status" : 1 } }
         );
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database PRODUCTS has failed';
        }
        return err;
    }
};


module.exports = new DataAccess(); 