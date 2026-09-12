const passport = require('passport');

module.exports = (app)=>{
    app.get('/auth/google', passport.authenticate('google', {
        scope : ['profile', 'email'],
    }));

    app.get('/auth/google/callback', passport.authenticate('google'),(req, res) => {
        res.redirect('/api/current_user');
    });

    app.get('/api/current_user',(req, res)=>{
        console.log('Session data:', req.session);
        console.log('User data:', req.user);
        res.send(req.user || { message: 'No user logged in' });
    });

    app.get('/api/logout', (req, res)=>{
        req.logout();
        res.send(req.user);
    })
};
