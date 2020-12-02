const express = require('express');
const Pool = require('pg').Pool;

const router = express.Router();

const pool = new Pool({
  // type: 'postgres',
  user: 'postgres',
  password: 'hoilamgi',
  database: 'postgres',
  host: 'localhost',
  port: 5432
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


router.post('/report/contacts', function(req, res, next) {
  try {
    const {firstName, lastName, email} = req.body;

    pool.query(
      "INSERT INTO contact(id, firstname, lastname, email) VALUES(3,$1,$2,$3)",
      [
        firstName,
        lastName,
        email
      ]
    ).then((result) => {
      res.json(result);
    }).catch(err => console.error('Error executing query', err.stack));

  } catch (e) {
    console.log(e.message);
  }
});


router.get('/report/contacts', function(req, res, next) {
  try {
    pool.query("SELECT * FROM contact")
      .then((result) => {
        res.json(result.rows);
      }).catch(err => {
        console.error('Error executing query', err.stack)
      });
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/authenticate', function(req, res, next) {
  try {
    pool.query(
      "SELECT * FROM public.user WHERE email=$1 AND password=$2",
      [
        req.body.email,
        req.body.password
      ]
    ).then((result) => {
      if (result.rows.length) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({
          message: 'Could not found the email/password!'
        });
      }
    }).catch(err => {
      console.error('Error executing query', err.stack)
      res.status(500).send(err);
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).json(e);
  }
});


module.exports = router;
