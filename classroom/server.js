const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
app.set("view engine" , "ejs");
app.set('views', path.join(__dirname, 'views'));

const sessionOptions = {
  secret: "<your_secret_key_here>",
  resave: false,
  saveUninitialized: true,
}

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next) => {
  res.locals.messages = req.flash("success");
  res.locals.errorMessages = req.flash("error");
  next();
});

app.get("/register" , (req , res) => {
  let { username = "default_user" } = req.query;
  req.session.username = username;
  if(username != "default_user"){
    req.flash("success" , "Successfully registered!");
  }else{
    req.flash("error" , "Please provide a username!");
  }
  res.redirect("/greet");
})

app.get("/greet" , (req , res) => {
  res.render("page.ejs" , {username : req.session.username });
})

// app.use(cookieParser());

// app.get("/setcookie", (req, res) => {
//   res.cookie("username", "shubham", {
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     httpOnly: true
//   });
//   res.send("Cookie set!");
// });


// app.get("/getcookie", (req, res) => {
//   console.log(req.cookies);
//   res.send(req.cookies.username);
// });





app.get("/", (req, res) => {
  res.send("Root Route");
});



app.listen(3000, () => {
  console.log("Server running on port 3000");
});
