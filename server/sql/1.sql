CREATE TABLE address(
  addressid SERIAL PRIMARY KEY,
  text TEXT UNIQUE NOT NULL
);

CREATE TABLE account(
  userid SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  address INTEGER references address(addressid),
  bestfriend INTEGER references account(userid)
);
