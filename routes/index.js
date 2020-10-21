const express = require ("express"),
      router  = express.Router(),
      passport = require("passport");



      router.get("/", function(request, response){
        response.render("landing");
      });


      module.exports = router;