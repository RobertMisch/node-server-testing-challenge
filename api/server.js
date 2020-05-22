const express = require("express");

const Router = require("../router/router-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/test2", (req, res) => {
    Router.getAll()
    .then(router => {
      res.status(200).json(router);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.delete('/test2/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)
    Router.remove(id)
    .then(deleted => {
      if (deleted) {
          console.log('working')
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete scheme' });
    });
  });

  server.post('/test2', (req, res) => {
    const newData = req.body;
  
    Router.insert(newData)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    });
  });

module.exports = server;