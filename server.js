const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);

app.set('view engine', 'hbs');

//Setup express middleware - these work in sequence

//Custom express midleware to log request
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', `${log}\n`, (err)=>{
    if(err){
      console.log('Error writing log');
    }
  });

  next();
});

//check maintenance mode
// app.use((req,res,next)=>{
//   console.log('In maint');
//   res.render('maintenance.hbs');
// });

//Setup static folder
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (s) => s.toUpperCase());

//register routes to express
app.get('/', (req, res)=>{

  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi welcome to My home page!'
  });

  // res.send({
  //   name: 'Moneesh',
  //   likes: [
  //     'Biking',
  //     'Swimming'
  //   ]
  // });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(8080, () => {
  console.log('Server is up at port 8080');
});
