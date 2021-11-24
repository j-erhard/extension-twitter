exports.signup = function(req, res) {
    res.render('signup'); }


exports.signin = function(req, res) {
    res.render('signin');
}

exports.quetes = function(req,res){
    res.render('TableDesQuetes'); }

exports.contact = function(req,res){
    res.render('Contact'); }

exports.home = function(req,res){
    res.render('home'); }


exports.logout = function(req,res){
    req.session.destroy(function(err) {
    res.redirect('/signin'); });
}
