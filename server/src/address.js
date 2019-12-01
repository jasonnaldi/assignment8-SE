module.exports = class Address {
  constructor(conn) {
    this.conn = conn;
  }

  get(address) {
    return this.conn
      .query('SELECT * FROM address WHERE text=$1', [address])
      .then((res) => res.rows);
  }

  insert(address) {
    return new Promise((resolve, reject) => {
      this.conn
        .query('INSERT INTO address(text) VALUES ($1)', [address])
        .then(() => {
          this.get(address)
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
    });
  }

  getAndInsertIfNew(address) {
    return new Promise((resolve, reject) => {
      this.get(address)
        .then((rows) => {
          if (rows.length > 0) {
            const addressRecord = rows[0];

            resolve(addressRecord);
          } else {
            this.insert(address)
              .then((addressRecord) => {
                console.log('new address', addressRecord);
                resolve(addressRecord);
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};
