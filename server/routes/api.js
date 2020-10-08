const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

mongoose
    .connect('mongodb://mongo:27017/barca', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .catch(err => {
      console.log('Could not connect to MongoDB!', err.message);
    });

router.get('/users', function(req, res, next) {
  res.send([
    {
      "id": 1,
      "name": "Andres Iniesta",
      "username": "iniesta",
      "email": "iniesta@barca.com",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
    {
      "id": 2,
      "name": "Sergio Busquet",
      "username": "Busquet",
      "email": "busquet@barca.tv",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771",
        "geo": {
          "lat": "-43.9509",
          "lng": "-34.4618"
        }
      },
      "phone": "010-692-6593 x09125",
      "website": "anastasia.net",
      "company": {
        "name": "Deckow-Crist",
        "catchPhrase": "Proactive didactic contingency",
        "bs": "synergize scalable supply-chains"
      }
    }]);
});

router.post('/users', function(req, res, next) {
  const User = mongoose.model('User', {
    name: String,
    email: String
  });

  const player = new User({ name: 'Iniesta', email: 'iniesta@barca.com' });

  player
      .save()
      .then(() => {
        console.log('add success');

        res.send(true);
      })
      .catch(err => {
        console.log('Could not add new player!', err.message);
      });
});

module.exports = router;
