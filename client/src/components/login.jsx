import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-named-default
import { default as setPageNameAction } from '../actions/setPageName.js';

// eslint-disable-next-line import/no-named-default
import { default as setUserAction } from '../actions/setUser.js';

import '../styles/login.css';


const submit = (username, password, setPageName, setUser) => {
  fetch('/api/v1/user/login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setPageName('user');
      setUser(res.payload.user);
    })
    .catch((err) => {
      console.error(err);
    });
};

const Login = ({ setPageName, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login">
      <h1>Log In</h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(username, password, setPageName, setUser); }}>
        <label>User Name</label>
        <input
          type="text"
          data-test="username"
          value={username}
          onChange={(e) => { setUsername(e.target.value); }}
        />

        <label>Password</label>
        <input
          type="password"
          data-test="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); }}
        />

        <input
          type="submit"
          value="Log In"
          data-test="submit"
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  setPageName: PropTypes.func,
  setUser: PropTypes.func,
};

Login.defaultProps = {
  setPageName: () => {},
  setUser: () => {},
};

// eslint-disable-next-line arrow-body-style
const mapStateToProps = () => {
  return {
  };
};

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return {
    setPageName: (pageName) => { dispatch(setPageNameAction(pageName)); },
    setUser: (pageName) => { dispatch(setUserAction(pageName)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(Login));
