const crypto = require('crypto');
var express = require('express');
const { addEvent, deleteEvent, getEventById, getEventByDate, 
  addParticipant, addObserver } = require('../model/event');
var router = express.Router();

router.get('/event', (req, res) => {
    getEventById(req.params.id)
    .then(response => {
      res.json(response.rows);
    })
    .catch(err => {
      console.log(err);
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
  
  router.delete('/event', (req, res) => {
    deleteEvent(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })

  router.get('/event-date', (req, res) => {
    getEventByDate(req.body)
    .then(response => {
      res.json(response.rows);
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

