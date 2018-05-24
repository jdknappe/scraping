var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var $ = cheerio.load('<h2 class="title">Hello world</h2>')
var request = require('request');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var PORT = 3000;

// Set Handlebars.
app.engine('handlebars', exphbs({ defaultLayout: 'main', extname: 'hbs', partialsDir: [__dirname + 'views/partials'] }));
app.set('view engine', 'hbs');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Import routes and give the server access to them.
var routes = require("./controllers/catsController.js");

app.use(routes);

app.listen(PORT, function() {
    console.log("http://localhost:" + PORT);
});

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

console.log($.html())

