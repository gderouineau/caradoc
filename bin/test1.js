#!/usr/bin/env node

/**
 * Module dependencies.
 */

var exec = require('child_process').exec
    , program = require('commander')
    , mkdirp = require('mkdirp')
    , pkg = require('../package.json')
    , version = pkg.version
    , os = require('os')
    , fs = require('fs')
    , file = require('./file')
    , style = require('./style')
    , view = require('./view')
    ;

exports.do = function(name) {

    var path = name || '.';

    var eol = os.EOL;

    /**
     * Jade template
     */
    var jadeLayout = view.jadeLayout.join(eol);

    var jadeIndex = view.jadeIndex.join(eol);

    var jadeInfo = view.jadeInfo.join(eol);

    var jade404 = view.jade404.join(eol);

    var jade401 = view.jade401.join(eol);

    /**
     * CSS
     */
    var css = style.css.join(eol);

    /**
     * PROJECT FILES
     */
    var subRoutes = file.subRoutes.join(eol);

    var controller = file.controller.join(eol);

    var routes_config = file.routes_config.join(eol);

    var security_config = file.security_config.join(eol);

    var project_params = file.project_params.join(eol);

    var mail_params = file.mail_params.join(eol);

    var db_params = file.db_params.join(eol);

    var app = file.app.join(eol);

    (function createApplication(path) {
        emptyDirectory(path, function(empty){
            if (empty || program.force) {
                createApplicationAt(path);
            } else {
                program.confirm('destination is not empty, continue? ', function(ok){
                    if (ok) {
                        process.stdin.destroy();
                        createApplicationAt(path);
                    } else {
                        abort('aborting');
                    }
                });
            }
        });
    })(path);
    /**
     * Create application at the given directory `path`.
     *
     * @param {String} path
     */
    function createApplicationAt(path) {
        console.log();
        process.on('exit', function(){
            console.log();
            console.log('   install dependencies:');
            console.log('     $ cd %s && npm install', path);
            console.log();
            console.log('   run the app:');
            console.log('     $ node app');
            console.log();
        });

        mkdir(path, function(){

            /**
             * /public repository and sub-repository
             */
            mkdir(path + '/public');
            mkdir(path + '/public/javascripts');
            mkdir(path + '/public/images');
            mkdir(path + '/public/stylesheets', function(){
                write(path + '/public/stylesheets/style.css', css);
            });

            /**
             * /src repository and sub-repository
             */
            mkdir(path + '/src');
            mkdir(path + '/src', function() {
                write(path + '/src/404.jade', jade404);
            });
            mkdir(path + '/src', function() {
                write(path + '/src/401.jade', jade401);
            });
            mkdir(path + '/src/welcomeBundle' );
            mkdir(path + '/src/welcomeBundle/config' );
            mkdir(path + '/src/welcomeBundle/config', function(){
                write(path + '/src/welcomeBundle/config/routes.js', subRoutes);
            });
            mkdir(path + '/src/welcomeBundle/controller', function(){
                write(path + '/src/welcomeBundle/controller/accueil.js', controller);
            });
            mkdir(path + '/src/welcomeBundle/views');
            mkdir(path + '/src/welcomeBundle/views/accueil');
            mkdir(path + '/src/welcomeBundle/views/accueil', function(){
                write(path + '/src/welcomeBundle/views/layout.jade', jadeLayout);
                write(path + '/src/welcomeBundle/views/accueil/index.jade', jadeIndex);
                write(path + '/src/welcomeBundle/views/accueil/info.jade', jadeInfo);
            });
            /**
             * /config repository and sub-repository
             */
            mkdir(path + '/config');
            mkdir(path + '/config', function(){
                write(path + '/config/routes.js', routes_config);
                write(path + '/config/security.js', security_config);
            });
            mkdir(path + '/config/params');
            mkdir(path + '/config/params', function() {
                write(path + '/config/params/project.js', project_params);
                write(path + '/config/params/db.js', db_params);
                write(path + '/config/params/mail.js', mail_params);
            });


            // package.json
            var pkg = {
                name: 'application-name'
                , version: '0.0.1'
                , private: true
                , scripts: { start: 'node app.js' }
                , "dependencies": {
                    "caradoc-server"  : "~0.0.*",
                    "caradoc-router"  : "~0.0.*",
                    "caradoc-security": "~0.0.*",
                    "caradoc-login"   : "~0.0.*",
                    "caradoc-sql"     : "~0.0.*",
                    "caradoc-user"    : "~0.0.*",
                    "jade"            : "*",
                    "mysql"           : "*"
                }
            };

            if (program.template) pkg.dependencies[program.template] = '*';

            write(path + '/package.json', JSON.stringify(pkg, null, 2));
            write(path + '/app.js', app);
        });
    }

    /**
     * Check if the given directory `path` is empty.
     *
     * @param {String} path
     * @param {Function} fn
     */

    function emptyDirectory(path, fn) {
        fs.readdir(path, function(err, files){
            if (err && 'ENOENT' != err.code) throw err;
            fn(!files || !files.length);
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

    /**
     * Exit with the given `str`.
     *
     * @param {String} str
     */

    function abort(str) {
        console.error(str);
        process.exit(1);
    }

};