const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));




app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
// Here I render the beers
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.send('Error fetching beers');
    });
});


app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randombeer', { randomBeer: responseFromAPI[0] });
    })
    .catch(error => {
      console.log(error);
      res.send('Error fetching random beer');
    });
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
