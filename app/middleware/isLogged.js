var isLogged = function (req, res, next) {
    if(req.session.user){
        res.redirect('/');

        return;
    }

    next();
};

module.exports = isLogged;