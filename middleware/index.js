// all middleware in here
const Champion = require("../models/champions");


let middlewareObj = {};

//middleware used to check authorizatiion of logged in useer to perfomr varisou tasks
middlewareObj.checkAccountOwnership = function (request, response, next){
    //is user logged in
    if(request.isAuthenticated()){
       Champion.findById(request.params.id, function(error, foundChamp){

           if(error){
               console.log(error);
               response.redirect("back");
           } else {
               //does the user own the campground - did they make it? compare the id for user to id of author in campground
               if(foundChamp.author.id.equals(request.user._id) || request.user.role === "admin"){
                  next();
               } else {
                   response.redirect("back");
               }
               
           }
       });

   } else { 
     response.redirect("back");
   }
}


//middleware to confirm user is logged in before allowing the function that follwos to run - otherwise redirects to login page
middlewareObj.isLoggedIn = function (request, response, next){
    if(request.isAuthenticated()){
        return next();
    } else {
        response.redirect("/login");
    }
}



module.exports = middlewareObj;






