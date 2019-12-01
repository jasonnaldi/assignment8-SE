import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Login from './login.jsx';
import SignUp from './signup.jsx';
import User from './user.jsx';

// eslint-disable-next-line import/no-named-default
import { default as setPageNameAction } from '../actions/setPageName.js';

import '../styles/app.css';


const App = (props) => {
  const { pageName, setPageName } = props;

  let currentPage;

  switch (pageName) {
    case 'login':
      currentPage = (
        <Login />
      );
      break;

    case 'signup':
      currentPage = (
        <SignUp />
      );
      break;

    case 'user':
      currentPage = (
        <User />
      );
      break;

    case 'main':
    default:
      currentPage = (
        <div>
          <h1>Main</h1>
          <button
            type="button"
            onClick={() => { setPageName('login'); }}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => { setPageName('signup'); }}
          >
            Sign up
          </button>
        </div>
      );
  }

  return (
    <div className="app">
      {
        currentPage
      }
    </div>
  );
};


App.propTypes = {
  pageName: PropTypes.string,
  setPageName: PropTypes.func,
};

App.defaultProps = {
  pageName: 'main',
  setPageName: () => {},
};

const mapStateToProps = (state) => {
  const { pageName } = state;
  return {
    pageName,
  };
};

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return {
    setPageName: (pageName) => { dispatch(setPageNameAction(pageName)); },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(App));
