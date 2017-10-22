export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const onSubmit = () => dispatch => {
  dispatch({
    type: 'ON_SUBMIT',
  });
};

export const displayProvidersFunc = () => dispatch => {
  dispatch({
    type: 'DISPLAY_PROVIDERS',
  });
};

export const chooseBank = bank => dispatch => {
  dispatch({
    type: 'CHOOSE_BANK',
    bank,
  });
};
