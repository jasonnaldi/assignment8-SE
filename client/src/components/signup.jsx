import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line import/no-named-default
import { default as setPageNameAction } from '../actions/setPageName.js';

// eslint-disable-next-line import/no-named-default
import { default as setUserAction } from '../actions/setUser.js';

import '../styles/signup.css';


const submit = (username, password, address, setPageName, setUser) => {
  fetch('/api/v1/user', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      address,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      setPageName('user');
      setUser(res.payload.user);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};

const SignUp = ({ setPageName, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  return (
    <div className="signup">
      <form onSubmit={(e) => { e.preventDefault(); submit(username, password, address, setPageName, setUser); }}>
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

        <label>Address</label>
        <input
          type="text"
          data-test="address"
          value={address}
          onChange={(e) => { setAddress(e.target.value); }}
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

SignUp.propTypes = {
  setPageName: PropTypes.func,
  setUser: PropTypes.func,
};

SignUp.defaultProps = {
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
)(React.memo(SignUp));
