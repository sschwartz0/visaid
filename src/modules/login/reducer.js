
const initialState = {
  username: undefined,
  password: undefined,
  loggedIn: false,
  bank: undefined,
  displayProviders: false,
  selection: [
    { name: 'Capital One', logo: '' },
    { name: 'Chase Bank', logo: '' },
    { name: 'Bank of America', logo: 'https://www.famouslogos.net/images/bank-of-america-logo.jpeg' },
  ],
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

    case 'ON_SUBMIT': {
      return {
        ...state,
        loggedIn: true,
      };
    }

    case 'DISPLAY_PROVIDERS': {
      return {
        ...state,
        displayProviders: true,
      };
    }

    case 'CHOOSE_BANK': {
      const {
        bank,
      } = action;
           
      return {
        ...state,
        displayProviders: false,
        bank,
      };
    }

    default:
      return state;
  }
};

export default reducer;
