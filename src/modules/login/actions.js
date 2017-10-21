export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};
