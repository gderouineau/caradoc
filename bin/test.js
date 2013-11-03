var fs = require('fs');
var path = process.cwd();



exports.database =  function(){


};

var EntityNotOK = function(name){};
var EntityOk = function(name) {

    function update(name){
        process.on('exit', function(){
            console.log();
            console.log('   your data base ' +  name );
            console.log('   was correctly updated');
            console.log();
        });

        var object = new entity.generate[name]();

        var params = object.params;


        // FIRST CREATE TABLE IF NOT EXIST
        var query = "CREATE TABLE IF NOT EXISTS " +  params['EntityName'] + " (";


        for (var key in params) {
            var subParams = params[key];
            if( ( key.toString().toLowerCase() != 'EntityName'.toString().toLowerCase() )
                ){
                query += " " + key + " ";
                for( var subKey in subParams){
                    query += subParams[subKey] +  " ";
                }
                query += ",";
            }

        }
        query = query.slice(0, query.length -2);
        query += ")";
        query += "ENGINE=MyISAM DEFAULT CHARSET=utf8 ;";
        connection.query(query)
            .on('error', function(err){

            })
            .on('result', function(res){

            })
            .on('end', function(){
                console.log('create ok');
            })
        ;

        /*
         *  ALTER TABLE WITH ALL COLUMN AND PARAMETERS
         *
         *
         *
         *
         */
        var pKey = "";
        var place = "";
        for (var key1 in params) {

            if( ( key1.toString().toLowerCase() != 'EntityName'.toString().toLowerCase() )
                ){
                (function(currentKey, previousKey){
                    var existColumn = "SHOW COLUMNS FROM " + params['EntityName'] + " WHERE FIELD=\'" + currentKey + "\'";

                    connection.query(existColumn, function(err, result){

                        if(result){

                            var subParams1 = params[currentKey];
                            if(pKey == ""){
                                place = FIRST;
                            }
                            else {
                                place = " AFTER " + previousKey + "";
                            }
                            var query1 = 'ALTER IGNORE TABLE ' + params['EntityName'] + " ADD  " + currentKey + " ";

                            for( var subKey1 in subParams1){
                                query1 += subParams1[subKey1] +  " ";
                            }
                            query1 += place;
                            console.log(query1);
                            connection.query(query1, function(err){


                            });

                        }
                    });
                })(key1, pKey);
                pKey = key1;
            }
        }


        /*
         *  remove column that don't exist anymore in the entity
         */

        var existColumns = "DESCRIBE " + params['EntityName'];
        connection.query(existColumns)
            .on('error', function(err){
                console.log("error : " + err);
            })

            .on('result', function(rows){

                var field = rows['Field'].split(" ");
                var paramValue = [];
                var compteur = 0;
                for(key in params){
                    paramValue[compteur] =  key;
                    compteur++;
                }
                for( var i = 0 ; i < field.length; i++){
                    console.log(field[i]);
                    if(paramValue.indexOf(field[i]) ==  (-1)){
                        var query = "ALTER TABLE " + params['EntityName'] + " DROP " + field[i];
                        console.log(query);
                        connection.query(query , function(err){
                            if(err){ console.log(err);}
                        });
                    }
                }
            })
        ;

        /*
         * UPDATE COLUMNS  PROPERTIES
         *
         */
        for (var key1 in params) {

            if( ( key1.toString().toLowerCase() != 'EntityName'.toString().toLowerCase() )
                ){
                (function(currentKey){

                    var subParams1 = params[currentKey];

                    var query1 = 'ALTER IGNORE TABLE ' + params['EntityName'] + " MODIFY  " + currentKey + " ";

                    for( var subKey1 in subParams1){
                        query1 += subParams1[subKey1] +  " ";
                    }
                    query1 += place;
                    console.log(query1);
                    connection.query(query1, function(err){


                    });

                })(key1);
            }
        }
    }

    update(name);
};
var caradocEntityExist = fs.existsSync(path + '/node_modules/' + 'caradoc-entity');
var caradocSQLExist = fs.existsSync(path + '/node_modules/' + 'caradoc-sql');
if((caradocEntityExist) && (caradocSQLExist))
{
    var entity = require(path + '/node_modules/' + 'caradoc-entity');
    var connection  = require(path + '/node_modules/' + 'caradoc-sql');
    exports.do = EntityOk;
}
else
{
    exports.do = EntityNotOK;
}

