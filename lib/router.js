var routes = require('../../../config/routes');
var security = require('../../../config/security');
var dir_path = "../../../";
var secure = require('./security').get;
exports.get = function (app) {

    /*
     * Parcourt des routes principales et secondaires pour pouvoir rédiriger vers l'action d'un controller.
     */
    for( var key in routes.get) {
        var subroutes = require(dir_path+'src/'+routes.get[key]['name']+'/config/routes');
        for(keys in subroutes.get) {
            var controller = require(dir_path+'src/'+routes.get[key]['name']+'/controller/'+subroutes.get[keys]['controller']);
            var firstPattern = '';
            if(routes.get[key]['pattern'] != '/'){
                firstPattern = routes.get[key]['pattern'];
            }
            var secondPattern = subroutes.get[keys]['pattern'];
            var pattern = firstPattern+secondPattern;
            if(subroutes.get[keys]['method'] == 'GET') {
                app.get(pattern, secure, controller.action[subroutes.get[keys]['action']]);
            }
            if(subroutes.get[keys]['method'] == 'POST') {
                app.post(pattern, controller.action[subroutes.get[keys]['action']]);
            }
            if(subroutes.get[keys]['method'] == 'PUT') {
                app.put(pattern, controller.action[subroutes.get[keys]['action']]);
            }
            if(subroutes.get[keys]['method'] == 'DELETE') {
                app.delete(pattern, controller.action[subroutes.get[keys]['action']]);
            }
        }
    }

    /*
     * LOGOUT
     */
    app.get('/logout', require('./log').logout);
    /*
     * LOGIN
     */
    app.post(require('../../../config/security').get.security.form_login.login_check, require('./log').login_check);
    /*
     * INSCRIPTION
     */
    app.post(require('../../../config/security').get.security.inscription.inscription_check, require('./log').inscription_check);

    /*
     * Route vers le dossier public et affichage des css javascripts et images
     */

    app.get('/public/:type/:param1/:param2?/:param3?/:param4?/:param5?', publicData);

    /*
     * 401 Unautorised
     */
    app.get('/401', function(req, res){
       res.render('src/401')
    });
    /*
     * Renvoie d'une erreur 404 dans le cas où aucune page ne serait trouvée.
     */
    app.get('*', function(req, res){
        res.render('src/404');
    });
};



function publicData (req, res) {

    var fs = require('fs');
    var rootPath = require('./path').root;
    var file = req.params.param1;
    if( req.params.param2){
        file+='/'+req.params.params2;
        if(typeof req.params.param3){
            file+='/'+req.params.params3;
            if(typeof req.params.param4){
                file+='/'+req.params.params4;
                if(typeof req.params.param5){
                    file+='/'+req.params.params5;

                }
            }
        }
    }


    if(req.params.type == "stylesheets") {

        fs.readFile(rootPath+ 'public/stylesheets/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        });
    }
    if(req.params.type == "javascripts") {

        fs.readFile(rootPath + 'public/javascripts/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }
    if(req.params.type == "images") {

        fs.readFile(rootPath + 'public/images/'+file, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.write(data);
            res.end();
        });
    }

}


