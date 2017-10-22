const initialState = {
  code: undefined,
  status: undefined,
  permissions: {
    address: {
      name: 'Address',
      description: 'Description',
      requested: false,
      value: undefined,
    },
    picture: {
      name: 'Picture',
      description: 'Description',
      requested: true,
      value: undefined,
    },
    employment_status: {
      name: 'Employment Status',
      description: 'Description',
      requested: false,
      value: undefined,
    },
    occupation: {
      name: 'Occupation',
      description: 'Description',
      requested: false,
      value: undefined,
    },
  },
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

    default:
      return state;
  }
};

export default reducer;
