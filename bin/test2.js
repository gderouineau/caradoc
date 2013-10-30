#!/usr/bin/env node

/**
 * Module dependencies.
 */

var exec = require('child_process').exec
    , program = require('commander')
    , mkdirp = require('mkdirp')
    , os = require('os')
    , fs = require('fs')
    , file = require('./bundle_file')
    , style = require('./style')
    , view = require('./view')
    ;

exports.do = function(name) {

    var path = '.';

    var eol = os.EOL;

    /**
     * PROJECT FILES
     */
    var Routes = [
        'exports.get = {'
        ,   ''
        ,   '   \'index\'  : {'
        ,   '       controller : \''+name+'\','
        ,   '       action     : \'index\','
        ,   '       pattern    : \'/'+name+'\','
        ,   '       method     : \'GET\''
        ,   '   }'
        ,   ''
        ,   '};'
    ].join(eol);

    var controller = [
        'exports.action = {'
        ,   ''
        ,   '   \'index\' : function(req,res) {'
        ,   ''
        ,   '       res.render(\'src/'+name+'Bundle/views/'+name+'/index\', {title: \"page d\'accueil du bundle '+name+'\"});'
        ,   ''
        ,   '   }'
        ,   ''
        ,   '};'
    ].join(eol);

    var jade = [
        'doctype 5'
        , 'html'
        , '  head'
        , '    title= title'
        , '    link(rel=\'stylesheet\', href=\'/public/stylesheets/style.css\')'
        , '  body'
        , ''
        , 'block content'
        , '  h1= title'
        , '  p Welcome to #{title}'
    ].join(eol);



    function createApplicationAt(name) {
        console.log();
        process.on('exit', function(){
            console.log();
            console.log('   your bundle ' +name+'Bundle');
            console.log('   is available');
            console.log();
        });
        readAndWrite(name);
        var path = 'src/'+name+'Bundle';
        mkdir(path, function(){

            /**
             * /public repository and sub-repository
             */
            mkdir(path);
            mkdir(path + '/config');
            mkdir(path + '/config', function(){
                write(path + '/config/routes.js', Routes)
            });
            mkdir(path + '/controller');
            mkdir(path + '/controller', function(){
                write(path + '/controller/'+name+'.js', controller)
            });
            mkdir(path + '/entity');
            mkdir(path + '/views');
            mkdir(path + '/views/'+name);
            mkdir(path + '/views/'+name, function(){
                write(path +'/views/'+name+'/index.', jade)
            });

        });
    }

    /**
     * echo str > path.
     *
     * @param {String} path
     * @param {String} str
     */

    function write(path, str) {
        fs.writeFile(path, str);
        console.log('   \x1b[36mcreate\x1b[0m : ' + path);
    }

    function readAndWrite(path){
        fs.readFile('config/routes.js', function (err, data) {
            if (err)  console.log(err);
            var newData = [
                ,   '   ,'
                ,   '   \''+path+'\' : {'
                ,   '       name    : \''+path+'Bundle\','
                ,   '       pattern : \'/\''
                ,   '   }'
                ,   ''
                ,   '};'].join(eol);
            var myfile = data.toString().replace("};", newData);
            fs.writeFile('config/routes.js', myfile, function(err){
                if(err) console.log('err');
            });
        });
    }
    /**
     * Mkdir -p.
     *
     * @param {String} path
     * @param {Function} fn
     */

    function mkdir(path, fn) {
        mkdirp(path, 0755, function(err){
            if (err) throw err;
            console.log('   \033[36mcreate\033[0m : ' + path);
            fn && fn();
        });
    }


    createApplicationAt(name);
};