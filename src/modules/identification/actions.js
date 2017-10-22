export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const generateCode = () => dispatch => {
  const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

  dispatch({
    type: 'GENERATE_CODE',
    code,
  });
};
