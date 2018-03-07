import { combineReducers } from 'redux';
import goalList from './goalList';
import goalMakeForm from './goalMakeForm';
import timer from './timer';
import record from './record';

export default combineReducers({
  goalList,
  goalMakeForm,
  timer,
  record,
});
