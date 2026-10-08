const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require("./models/Person");

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        console.log('Received Credentials :', USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: "incorrect user name " });
        const isPasswordMatched = await user.comparePassword(password);
        if (isPasswordMatched) {
            return done(null, user);
        }
        else {
            return done(null, false, { message: 'incorrect password' });

        }
    }
    catch (err) {
        return done(err);
    }
}))
module.exports = passport;