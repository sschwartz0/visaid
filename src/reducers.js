import { combineReducers } from 'redux';
import login from '../src/modules/login/reducer';
import identification from '../src/modules/identification/reducer';

export default combineReducers({
  login,
  identification,
});
