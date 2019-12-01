const BodyParser = require('body-parser');
const Express = require('express');
// const HttpStatus = require('http-status-codes');
const cors = require('cors');
const express = require('express');
const http = require('http');
const path = require('path');

const Web = require('./web.js');


module.exports = class App {
  constructor(dbUrl, dbUsername, dbPassword, dbName, dbPort) {
    // Setup server
    this.app = Express();
    this.server = http.Server(this.app);
    // TODO: this socket is for news to clients
    // this.socket = new WebSocket(this.server);

    this.web = new Web(dbUrl, dbUsername, dbPassword, dbName, dbPort);


    const { app } = this;

    app.use(express.static(path.join(path.resolve(__dirname, '..'), 'public')));
    app.use(BodyParser.json());
    app.use(BodyParser.urlencoded({ extended: true }));
    app.use(cors());

    const v1api = Express.Router();

    v1api
      .route('/user')
      .post((req, res) => {
        const { username, password, address } = req.body;

        this.web.registerUser(username, password, address)
          .then((userRecord) => {
            console.log('new user', userRecord);
            res.status(200).send({
              status: 'success',
              payload: {
                user: userRecord,
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: 'fail',
              payload: {
                reason: err.message,
              },
            });
          });
      });

    v1api
      .route('/user/login')
      .post((req, res) => {
        const { username, password } = req.body;

        this.web.userLogin(username, password)
          .then((userRecord) => {
            res.status(200).send({
              status: 'success',
              payload: {
                user: userRecord,
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: 'fail',
              payload: {
                reason: err.message,
              },
            });
          });
      });

    v1api
      .route('/user/bestFriend')
      .post((req, res) => {
        const { username, password, bestFriend } = req.body;

        // TODO

        this.web.userLogin(username, password)
          .then((userRecord) => {
            res.status(200).send({
              status: 'success',
              payload: {
                user: userRecord,
              },
            });
          })
          .catch((err) => {
            res.status(500).send({
              status: 'fail',
              payload: {
                reason: err.message,
              },
            });
          });
      });

    app.use('/api/v1', v1api);
  }

  listen(port) {
    this.server.listen(port, (err) => {
      if (err) throw err;

      // eslint-disable-next-line no-console
      console.info(`Listening on port ${port}`);
    });
  }
};
