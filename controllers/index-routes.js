
var router = function(app,passport) {

app.get('/', function (request, response) {
    response.send('Go For Sign up')
})

app.get('/logout', function (request, response) {
    request.session.destroy(function(err) {
        response.redirect('/?logout=true');
    })
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/userhome',
    failureRedirect: '/'
}));

app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/userhome',
    failureRedirect: '/'
}

));
}
module.exports = router;
