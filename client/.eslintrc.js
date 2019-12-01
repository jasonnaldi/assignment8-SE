module.exports = {
  "parserOptions": {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": 2018,
    "sourceType": "module",
  },

  "parser": "babel-eslint",

  "settings": {
    "react": { "version": "detect" },
  },

  "plugins": [
    "react",
  ],

  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
  ],

  "globals": {
    "document": false,
    "window": false,
    "CustomEvent": false,
    "fetch": false,
  },

  "rules": {
    "function-paren-newline": 0,
    "import/extensions": [ "error", "ignorePackages" ],
    "import/no-extraneous-dependencies": [ "error", { "packageDir": __dirname } ],
    "linebreak-style": [ "error", "unix" ],
    "quote-props": [ "error", "consistent-as-needed" ],
  }
};
