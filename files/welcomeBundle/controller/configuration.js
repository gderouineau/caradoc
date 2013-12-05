var fs = require('fs');

exports.action = {

    'project' : function(req,res) {

        res.render('src/welcomeBundle/views/configuration/project', {exception: ""});

    },

    'projectCheck' : function(req,res) {

        var error = false;

        if(req.body.app != "")
            readAndWrite('config/params/project.js', req.body.app, "applicationName");
        if(req.body.port != "")
            readAndWrite('config/params/project.js', req.body.port, "3000");
        if(req.body.render != "")
            readAndWrite('config/params/project.js', req.body.render, "jade");
        if(req.body.secret != "")
            readAndWrite('config/params/project.js', req.body.secret, "ThisTokenIsNotSoSecretYouShouldChangeIt");

        if(error){
            res.redirect('/configuration/project');
        }
        else {
            res.render('src/welcomeBundle/views/configuration/project_check');
        }

    },

    'sql' : function(req,res) {

        res.render('src/welcomeBundle/views/configuration/sql', {exception: ""});

    },

    'sqlCheck' : function(req,res) {
        var error = false;

        if(req.body.dialect != "")
            readAndWrite('config/params/db.js', req.body.dialect, "mysql");
        if(req.body.host != "")
            readAndWrite('config/params/db.js', req.body.host, "localhost");
        if(req.body.db != "")
            readAndWrite('config/params/db.js', req.body.db, "database name");
        if(req.body.user != "")
            readAndWrite('config/params/db.js', req.body.user, "user name");
        if(req.body.password != "")
            readAndWrite('config/params/db.js', req.body.password, "password");

        if(error){
            res.redirect('/configuration/sql');
        }
        else {
            res.render('src/welcomeBundle/views/configuration/sql_check');
        }

    },

    'mail' : function(req,res) {

        res.render('src/welcomeBundle/views/configuration/mail', {exception: ""});

    },

    'mailCheck' : function(req,res) {

        var error = false;

        if(req.body.service != "")
            readAndWrite('config/params/mail.js', req.body.service, 'GMAIL');
        if(req.body.email != "")
            readAndWrite('config/params/mail.js', req.body.email, 'download.caraodoc@gmail.com');
        if(req.body.password != "")
            readAndWrite('config/params/mail.js', req.body.password, 'test1234test');

        if(error){
            res.redirect('/configuration/mail');
        }
        else {
            res.render('src/welcomeBundle/views/configuration/mail_check');
        }

    },

    'done' : function(req,res) {

        res.render('src/welcomeBundle/views/configuration/done', {exception: ""});

    }

};


function readAndWrite(path, newValue ,oldValue){
    var data = fs.readFileSync(path);

    var myFile = data.toString().replace(oldValue, newValue);
    fs.writeFileSync(path, myFile);

}
