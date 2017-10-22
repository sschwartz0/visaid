const initialState = {
  code: undefined,
  status: 'IDLE',
  requestStatus: undefined,
  permissions: {
    address: {
      name: 'Address',
      description: 'You will receive the users city, zipcode and state',
      requested: false,
      value: undefined,
    },
    picture: {
      name: 'Picture',
      description: 'You will receive a picture of the user',
      requested: false,
      value: undefined,
    },
    employment_status: {
      name: 'Employment Status',
      description: 'You will receive the users current employment status',
      requested: false,
      value: undefined,
    },
    occupation: {
      name: 'Occupation',
      description: 'You will receive the users current occupation',
      requested: false,
      value: undefined,
    },
  },
  sendingPermissions: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FORM_CHANGE': {
      const {
        name,
        value,
      } = action;

      return {
        ...state,
        [name]: value,
      };
    }

    case 'GENERATE_CODE': {
      const { code } = action;

      return {
        ...state,
        code,
        isRequesting: true,
      };
    }
    
    case 'CHANGE_STATUS': {
      const { status } = action;
      
      return {
        ...state,
        status,
      };
    }

    case 'REQUEST_PERMISSION': {
      const { 
        permissionKey,
        requested,
      } = action;

      return {
        ...state,
        permissions: {
          ...state.permissions, 
          [permissionKey]: {
            ...state.permissions[permissionKey],
            requested,
          },
        },
      };
    }
    
    case 'ACCEPT_PERMISSION': {
      const {
        permissionKey,
        accepted,
      } = action;
      
      return {
        ...state,
        sendingPermissions: {
          ...state.sendingPermissions,
          [permissionKey]: {
            ...state.sendingPermissions[permissionKey],
            accepted,
          },
        },
      };
    }
    
    case 'SEND_ALL_PERMISSIONS': {
      return {
        ...state,
        // TAKE VALUES FROM SENDINGPERMISSIONS AND PUT THEM INTO THE PERMISSIONS ARRAY
      }
    }
    
    case 'CHANGE_REQUEST_STATUS': {
      const { requestStatus } = action;
      
      return {
        ...state,
        requestStatus,
      }
    }

    default:
      return state;
  }
};

export default reducer;
