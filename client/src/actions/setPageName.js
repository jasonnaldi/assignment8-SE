export const SET_PAGE_NAME = 'setPageName';

export default function setPageName(pageName) {
  return {
    type: SET_PAGE_NAME,
    payload: {
      pageName,
    },
  };
}
