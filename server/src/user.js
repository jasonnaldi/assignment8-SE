module.exports = class User {
  constructor(conn) {
    this.conn = conn;
  }

  get(username) {
    return this.conn
      .query('SELECT * FROM account WHERE username=$1', [username])
      .then((res) => res.rows);
  }

  insert(username, password, addressId) {
    return new Promise((resolve, reject) => {
      this.get(username)
        .then((rows) => {
          if (rows.length > 0) {
            reject(new Error('User already exists'));

            return;
          }

          this.conn
            .query(
              'INSERT INTO account(username, password, address) VALUES ($1, $2, $3)',
              [username, password, addressId],
            )
            .then((res) => res.rows[0])
            .then((userRecord) => {
              resolve(userRecord);
            });
        });
    });
  }
};
