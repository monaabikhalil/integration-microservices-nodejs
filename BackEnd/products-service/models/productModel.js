var DataAccess = require('../controllers/dataController');

const Model = function(){
    this.databaseName = 'products-database';
    this.collectionName = 'products-collection'
};

Model.prototype.GetAllProducts = async function(){
    let that = this;
    try{
        var response = await DataAccess.GetAllProducts(that.databaseName, that.collectionName);
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.AddMovie = async function(movies){
    let that = this;
    try{
        var response = await DataAccess.AddProduct(that.databaseName, that.collectionName, movies);
        return response;
    }catch(err){
        return err;
    }
};

Model.prototype.OrderMovie = async function(movieName){
    let that = this;
    try{
        var response = await DataAccess.ChangeState(that.databaseName, that.collectionName, movieName);
        return response;
    }catch(err){
        return err;
    }
};


module.exports = new Model();