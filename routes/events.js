const crypto = require('crypto');
var express = require('express');
const { addEvent, deleteEvent, getEventById, getEventByDate, 
  addParticipant, addObserver, getComment, addComment, updateEvent, asyncPromAll, executeQueries, getEventForCalendar } = require('../model/event');
var router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.use(cors());

function verifyToken(req, res, next) {
  const authHeader = req.headers.authentication;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'your-jwt-secret', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    console.log('nepreslo overenie tokenu')
    res.sendStatus(401);
  }
}

router.get('/event/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    getEventById(id)
    .then(response => {
      console.log(response.rows);
      res.json(response.rows);
    })
    .catch(err => {
      console.log('je tu chyba a n tejto to pada');
      res.status(500);
    })
  })


  router.post('/event', (req, res) => {
    addEvent(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.post('/eventpar', (req, res) => {
    executeQueries(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('som tu a padam');
      res.status(500).send(error);
    })
  })
  
  router.put('/update/:id', (req, res) => {
    updateEvent(req.params.id, req.body)
    .then(response => {
      res.json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })

  })

  router.delete('/event/:id', (req, res) => {
    deleteEvent(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  router.get('/event-date', verifyToken, (req, res) => {
    const param1 = req.query.param1; // Extract the value of 'param1'
    const param2 = req.query.param2;
    const param3 = req.query.param3;

    getEventByDate(param1, param2, param3)
    .then(response => {
      res.json(response.rows);
 //     console.log(req.params.id_of_owner);
 //     console.log(req.params.date);

    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.get('/calendar/:user', verifyToken, (req, res) => {
    getEventForCalendar(req.params.user)
    .then(response => {
      res.json(response.rows);
 //     console.log(req.params.date);

    })
    .catch(error => {
      console.log('som tu lalal');
      res.status(500).send(error);

    })
  })

  router.post('/participant', verifyToken, (req, res) => {
    addParticipant(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.post('/observer', verifyToken, (req, res) => {
    addObserver(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.get('/comments/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    getComment(id)
    .then(response => {
      console.log(response.rows);
      res.json(response.rows);
    })
    .catch(err => {
      console.log('trala');
      res.status(500);
    })
  })

  router.post('/comments', verifyToken, (req, res) => {
    addComment(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })


  module.exports = router;

