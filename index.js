const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');


mongoose.connect(keys.mongoURI)
  .then(()=>{console.log('Connected to MongoDB Atlas : emaily-dev')})
  .catch(err => console.log('MongoDb connection error :', err));

require('./model/User');
require('./services/passport');

const app = express();

//Enable cookieSession
app.use(cookieSession({
  maxAge : 30*34*60*60*1000, //30 days
  keys : [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});