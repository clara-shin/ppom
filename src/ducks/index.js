import { combineReducers } from 'redux';
import goalList from './goalList';
import goalMakeForm from './goalMakeForm';

export default combineReducers({
  goalList,
  goalMakeForm,
});
