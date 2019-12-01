export const SET_USER = 'setUser';

export default function setUser(user) {
  return {
    type: SET_USER,
    payload: {
      user,
    },
  };
}
