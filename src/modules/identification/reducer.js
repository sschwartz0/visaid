const initialState = {
  code: undefined,
  isRequesting: false,
  permissions: {},
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
      };
    }

    default:
      return state;
  }
};

export default reducer;
