const express = require('express');
const { logger } = require('./schemes/scheme-middleware.js');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', logger ,SchemeRouter);

server.get("/", (req, res) => {
    res.send("welcome, server running ....");
  });

  server.use('*', (req, res) => {
    // catch all 404 errors middleware
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
  });

  server.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500). json({
      message: err.message,
      stack: err.stack
    })
  })


module.exports = server;