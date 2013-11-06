exports.action = {

    'tutorial'  : function(req,res){

        res.render('src/welcomeBundle/views/tutorial/' + req.params.page, {next:"/tutorial/" + (parseInt(req.params.page) + 1) , previous :"/tutorial/" + (parseInt(req.params.page) - 1)});
    }


};