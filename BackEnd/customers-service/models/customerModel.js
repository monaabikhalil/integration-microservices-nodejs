var DataAccess = require('../controllers/dataController');

const Model = function(){
    this.databaseName = 'customers-database';
    this.collectionName = 'customers-collection';
};

Model.prototype.GetAllCustomers = async function(){
    let that = this;
    try{
        var response = await DataAccess.GetAllCustomers(that.databaseName, that.collectionName);
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.AddCustomer = async function(customer){
    let a = this;
    console.log(a);
    try{
        console.log(customer);
        var response = await DataAccess.AddCustomer(a.databaseName, a.collectionName, customer);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
};

Model.prototype.AddMovieToCustomer = async function(customer, movie){
    let that = this;
    try{
        var response = await DataAccess.UpdateCustomer(that.databaseName, that.collectionName, customer, movie);
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
};


module.exports = new Model();