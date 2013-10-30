
var express = require('express');
var http    = require('http');
var path    = require('path');
var MemoryStore = express.session.MemoryStore;
var params = require('../../../config/params/project');


exports.start =  function () {

    var app = express();

    var rootPath = __dirname;
    rootPath = rootPath.split('/');
    var root = '';
    var lenght = rootPath.length;
    for( var i = 0 ; i < lenght -3 ; i++)
        root+= rootPath[i] +'/';

    app.set('port', process.env.PORT || params.data.port);
    app.set('views', root );
    app.set('view engine', params.data.view);
    app.set('title', params.data.name);
    app.use(express.favicon(),'/public/images/favicon.ico');
    app.use(express.logger(params.data.env));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(params.data.secret));//params.data.secret
    app.use(express.session({secret : 'test' , store : new MemoryStore()}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/public')));

    var router = require('./router');
    router.get(app);

    http.createServer(app).listen(app.get('port'), function(){
        console.log('Caradoc server listening on port ' + app.get('port'));
    });


};