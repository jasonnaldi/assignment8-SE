module.exports = {
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
  },

  "env": {
    "node": true,
    "es6": true,
  },

  "extends": [
    "airbnb-base",
    "eslint:recommended",
  ],

  "globals": {
    "Math": false,
  },

  "rules": {
    "function-paren-newline": 0,
    "linebreak-style": [ "error", "unix" ],
    "array-bracket-spacing": 0,
  }
};
