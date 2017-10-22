import axios from 'axios';

export const formChange = ({ name, value }) => dispatch => {
  dispatch({
    type: 'FORM_CHANGE',
    name,
    value,
  });
};

export const requestPermission = ({ permissionKey, requested }) => async (dispatch, getState) => {

  await dispatch({
    type: 'REQUEST_PERMISSION',
    permissionKey,
    requested,
  });

  const identification = getState().identification;
  const {
    code,
    permissions,
  } = identification;

  const requestedPermissions = Object.values(permissions)
    .filter(permission => permission.requested)
    .map(({ name }) => name);

  axios.post('http://localhost:3000/v1/requests', {
    cardId: 'asdzx23',
    permissions: requestedPermissions,
    safetyCode: code,
  })
    .then(response => {
      if (response.data === 'session deleted') {
        dispatch({
          type: 'GENERATE_CODE',
          code: undefined,
        });
        dispatch({
          type: 'CHANGE_STATUS',
          status: 'IDLE',
        });
      }
      else {
        dispatch({
          type: 'GENERATE_CODE',
          code: response.data.safetyCode,
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const changeStatus = status => dispatch => {
  dispatch({
    type: 'CHANGE_STATUS',
    status,
  });
};

export const sendCode = code => dispatch => {
  axios.get('http://localhost:3000/v1/requests', {
    safetyCode: code,
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })


}