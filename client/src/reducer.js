import { SET_PAGE_NAME } from './actions/setPageName.js';
import { SET_USER } from './actions/setUser.js';


export default function reducer(oldState = {}, action) {
  let state = {
    ...oldState,
  };

  const { type, payload } = action;

  switch (type) {
    case SET_PAGE_NAME: {
      const { pageName } = payload;

      state = {
        ...state,
        pageName,
      };
    } break;

    case SET_USER: {
      const { user } = payload;

      state = {
        ...state,
        user,
      };
    } break;

    default: {
      state = {
        ...state,
      };
    }
  }

  return state;
}
