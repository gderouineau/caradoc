var Mail = require('caradoc-mail');
exports.action = {

   'index' : function(req,res) {
       var mail = new Mail();
       mail.from = "download.caraodoc@gmail.com";
       mail.to = mail.from;
       mail.subject =  "new install";
       mail.html = "new install";
       mail.send();
       res.render('src/welcomeBundle/views/accueil/index', {exception: ""});

   }



};