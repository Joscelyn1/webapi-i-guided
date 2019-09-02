// import express from 'express'
const express = require('express'); // equivalent to above line

// import the hubs-model file
const Hubs = require('./data/hubs-model.js'); // we'll use Hubs to get access to the DB
// Hubs has a find(), findById(), add(), remove(), update() methods

const server = express();

server.use(express.json()); // <<<<<<< add this line to teach express how to parse JSON

/*req = request
res = response

must be in order: req res*/

server.get('/', (req, res) => {
  res.send('hello web 21');
});

// see a list of Hubs
server.get('/hubs', (req, res) => {
  // Hubs.find() returns a promise, we need the bros(.then, .catch)
  Hubs.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the list of hubs' });
    });
});

// create a Hub

server.post('/hubs', (req, res) => {
  const hubInformation = req.body;

  Hubs.add(hubInformation)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      res.status(500).json({ message: 'error adding the hub' });
    });
});

// delete a Hub

server.delete('/hubs/:id', (req, res) => {
  const hubId = req.params.id;

  Hubs.remove(hubId)
    .then(hub => {
      res.status(200).json({ message: 'hub deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ message: 'error removing the hub' });
    });
});
// update a Hub
server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Hubs.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'hub not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating hub' });
    });
});

const port = 5000;

server.listen(port, () => console.log('api running'));
