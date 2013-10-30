
var rootPath = __dirname;
rootPath = rootPath.split('/');
var root = '';
var lenght = rootPath.length;
for( var i = 0 ; i < lenght -3 ; i++)
    root+= rootPath[i] +'/';


exports.root = root;