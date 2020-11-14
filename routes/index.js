const express  = require ("express"),
      router   = express.Router(),
      passport = require("passport"),
      User     = require("../models/user");



router.get("/", function(request, response){
  response.render("landing");
});

//*New
router.get("/register", function(request, response){
  response.render("auth/register");
});

//*Create
router.post("/register", function(request, response){

  let newUser = new User({username: request.body.username, role: request.body.role, name: request.body.name, email: request.body.email, phone: request.body.phone});

  User.register(newUser,request.body.password, function(error, createdUser){
      if(error){
          return response.redirect("/register");
      }
      
      passport.authenticate("local")(request, response, function(){
         response.redirect("/champions");
      });
  });
});


//*New route for login in
router.get("/login", function(request, response){

  response.render("auth/login");
  
});

//*Create route confirms user is in database and logs user in 
router.post("/login", passport.authenticate("local", {
      successRedirect: "/champions",
      failureRedirect:"/login"
  }), function(request, response){

});


//Logout route logs out user
router.get("/logout", function(request, response){

  request.logout();
  response.redirect("/champions");
});






module.exports = router;