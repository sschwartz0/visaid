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
  
  axios.get('http://localhost:3000/v1/users/1', {
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
