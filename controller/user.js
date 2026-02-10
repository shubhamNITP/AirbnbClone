const User = require('../models/user.js');


// Render signup form
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

// Signup user
module.exports.signupUser = async (req, res) => {
    try {
        let {username , email , password} = req.body ;
        const newUser = new User({
            username ,
            email
        })
        const registeredUser = await User.register(newUser , password) ;
        console.log(registeredUser);

        req.login(registeredUser , (err) => {
            if(err) {
                return next(err) ;
            }
            
            req.flash("success" , "Welcome to Wanderlust!") ;
            res.redirect("/listings") ;
        }) ;
        
    } catch (error) {
        if (error.code === 11000) {
            req.flash("error", "Email already registered");
            return res.redirect("/signup");
        }
        req.flash("error" , error.message) ;
        res.redirect("/signup") ;
    }
}

// Render login form
module.exports.renderLoginForm = async (req, res) => {
    res.render("users/login.ejs");
}

// Login user
module.exports.loginUser =async (req, res) => {
    req.flash("success" , "Welcome back!") ;
    res.redirect(res.locals.redirectUrl || "/listings") ;
}

// Logout user
module.exports.logoutUser = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success" , "Logged out successfully!") ;
        res.redirect("/listings") ;
    });
}