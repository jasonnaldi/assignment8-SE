import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { default as setPageNameAction } from '../actions/setPageName.js';

import '../styles/user.css';


const submit = (username, password, address, setPageName) => {
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
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

const User = ({ user }) => {
  const [bestFriend, setBestFriend] = useState('');

  return (
    <div className="user">
      <h1>{
        user ? user.username : 'Error - no username'
        }
      </h1>
      <form onSubmit={(e) => { e.preventDefault(); submit(username, password, bestFriend); }}>
        <label>Best Friend</label>
        <input
          type="text"
          data-test="bestFriend"
          value={bestFriend}
          onChange={(e) => { setBestFriend(e.target.value); }}
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

User.propTypes = {
};

User.defaultProps = {
};

const mapStateToProps = (state) => {
  const { user } = state;

  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPageName: (pageName) => { dispatch(setPageNameAction(pageName)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(User));
