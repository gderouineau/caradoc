var fs = require('fs');
exports.route = function (dependency) {

    /*
     * Definition of the variable
     */
    var express = dependency['express'];
    var http = dependency['http'];
    var path = dependency['path'];
    var app = dependency['app'];

    /*
     * Call the controller
     */

    /*
     * Routes
     */

    app.get('/public/images/:file', function(req, res) {
        var file = req.params.file;
        fs.readFile(__dirname + '/images/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.write(data);
            res.end();
        });

    });
    app.get('/public/javascripts/:file', function(req, res) {
        var file = req.params.file;
        fs.readFile(__dirname + '/javascripts/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });

    });
    app.get('/public/stylesheets/:file', function(req, res){
        var file = req.params.file;
        fs.readFile(__dirname + '/stylesheets/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });

    });



};