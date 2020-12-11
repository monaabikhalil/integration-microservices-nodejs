//Connecting to the MongoDB 
const DataAccess = function(){
    this.MongoClient = require('mongodb').MongoClient, assert = require('assert');
    this.Mongo = require('mongodb');
    this.DBConnectionString = 'mongodb://mongo:27017';
}

DataAccess.prototype.GetAllCustomers = async function (databaseName, collectionName){
    var that = this;
    try {
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var customers_database = await response.db(databaseName);
        var collection = await customers_database.collection(collectionName);
        const item = await collection.find();
        const documents = await item.toArray();
        return documents;
    }catch(err){
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database CUSTOMERS has failed';
        }
        return err;
    }
};

DataAccess.prototype.AddCustomer = async function (databaseName, collectionName, data){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var customers_database = await response.db(databaseName);
        customers_database.collection(collectionName).insertOne(data ,function(err, res) {
            if (err) throw err;
            console.log("Customer added successfully");
            return "Customer added successfully";
        });
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database CUSTOMERS has failed';
        }
        return err;
    }
};

DataAccess.prototype.UpdateCustomer = async function (databaseName, collectionName, customer, movie){
    try {
        var that = this;
        var response = await that.MongoClient.connect(that.DBConnectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        var customers_database = await response.db(databaseName);

        customers_database.collection(collectionName).updateOne(
            { "name" : customer },
            { $set: { "movie" : movie } }
         );
    }catch(err){
        console.log(err.name);
        if(err.name == 'MongoNetworkError'){
            console.log(err);
            return 'Connection to the Database CUSTOMERS has failed';
        }
        return err;
    }
};


module.exports = new DataAccess(); 