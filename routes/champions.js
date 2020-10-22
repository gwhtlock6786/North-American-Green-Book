const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport");






router.get("/", function(request, response){
    response.render("champions/index.ejs");
});

module.exports = router;