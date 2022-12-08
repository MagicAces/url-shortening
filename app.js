const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

let links = [];
let error = "";

app.get("/", function(req, res) {


  res.render("index", {links: links, error: error});

});

app.post("/", function(req, res) {

  const url = "https://api.shrtco.de/v2/shorten?url=" + req.body.link;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const linkData  = JSON.parse(data);
      if(linkData.ok === true) {
        const link = {
          original_link: linkData.result.original_link,
          full_short_link: linkData.result.full_short_link,
          code: linkData.result.code
        };
        
        links.push(link);
        if(links.length >= 4)
          links.shift();
        error = '';

      } else {
        const error_code = linkData.error_code;
        if(error_code === 1)
          error = "Please add a URL";
        else
          error = "Not a valid URL";
      }
    });

    res.redirect("/");
  });

});

app.listen(process.env.PORT || 8000, function(req, res) {
  console.log("Server listening on port 8000");
})
