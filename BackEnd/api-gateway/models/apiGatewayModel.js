var http = require('http');

var Model = function(){};

Model.prototype.checkState = async function(microServices){
    var states = [];
    for(var i = 0; i < microServices.length; i++){
        var url = microServices[i].url + ":" + microServices[i].port + "/healthCheck";
        states.push(await this.getData(url));
    }
    return states;
};


Model.prototype.getData = async function(url){
	return new Promise(function(fulfill, reject){
        var request = http.get(url, res => {
            if (res.statusCode < 200 ||
                res.statusCode > 299) {
                    reject(new Error('Error status code: '
                    + res.statusCode));
            }
            var body = "";
            res.setEncoding("utf8");
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                console.log(JSON.parse(body));

                body = JSON.parse(body);
                try{
                    fulfill(body);
                } catch(exception){
                    reject(exception);
                }

                if(body && body.success){
                    fulfill(body.result);
                }
            });
        });

        request.on("error", function(err){
            err.success = false;
            fulfill(err);
        });
    });
};


module.exports = new Model();
