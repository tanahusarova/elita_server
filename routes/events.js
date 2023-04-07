const crypto = require('crypto');
var express = require('express');
const { addEvent, deleteEvent, getEventById, getEventByDate, 
  addParticipant, addObserver } = require('../model/event');
var router = express.Router();
const cors = require('cors');
router.use(cors());

router.get('/event/:id', (req, res) => {
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
      res.status(200);
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

  router.get('/event-date', (req, res) => {
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

  router.post('/participant', (req, res) => {
    addParticipant(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  router.post('/observer', (req, res) => {
    addObserver(req.body)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    })
  })

  module.exports = router;

