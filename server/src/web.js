const { Client } = require('pg');
const Address = require('./address.js');
const User = require('./user.js');


module.exports = class Web {
  constructor(dbUrl, dbUsername, dbPassword, dbName, dbPort) {
    const client = new Client({
      user: dbUsername,
      host: dbUrl,
      database: dbName,
      password: dbPassword,
      port: dbPort,
    });

    client.connect((err) => {
      // eslint-disable-next-line no-console
      if (err) {
        console.error('unable to connect', err);
        setTimeout(() => {
          client.connect();
        }, 2000);
      }
    });

    this.client = client;

    this.address = new Address(client);
    this.user = new User(client);
  }

  registerUser(username, password, address) {
    return new Promise((resolve, reject) => {
      this.address.getAndInsertIfNew(address)
        .then(({ addressid: addressId }) => {
          this.user.insert(username, password, addressId)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }

  userLogin(username, password) {
    const { client } = this;

    return client
      .query('SELECT * FROM account WHERE username=$1', [username])
      .then((res) => {
        const user = res.rows[0];

        if (user.password !== password) throw new Error('Wrong password');

        return {
          username,
        };
      });
  }
};
