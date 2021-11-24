exports.signup = function(req, res) {
    res.render('signup'); }


exports.signin = function(req, res) {
    res.render('signin');
}

exports.quetes = function(req,res){
    res.render('tableDesQuetes'); }

exports.contact = function(req,res){
    res.render('contact'); }

exports.home = function(req,res){
    res.render('home'); }

exports.verifie = function(req,res){
    res.render('verifie'); }

exports.logout = function(req,res){
    req.session.destroy(function(err) {
    res.redirect('/signin'); });
}
