import axios from 'axios';

export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const generateCode = () => async dispatch => {
  const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

  await dispatch({
    type: 'GENERATE_CODE',
    code,
  });

  // axios.post('localhost:3000/v1/requests', {
  //   safetyCode: code,
  // })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  
  axios.get('localhost:3000/v1/users/1', {
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const requestPermission = ({ permissionKey, name, requested }) => (dispatch, getState) => {
  
  const codeGenerated = !!getState().identification.code;
  console.log(codeGenerated)
  if (!codeGenerated) {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    
    dispatch({
      type: 'GENERATE_CODE',
      code,
    });
  }
  
  dispatch({
    type: 'REQUEST_PERMISSION',
    permissionKey,
    requested,
  });
};
