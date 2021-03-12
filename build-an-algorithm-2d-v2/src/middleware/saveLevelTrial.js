import ac  from '../reducer/actionCreators';
import {LOCAL_STORAGE_KEY, MAX_LEVEL} from "../utilities/constants";

const saveToLocalStorage = obj => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(obj));
}

const saveLevelTrial = store => next => action => {
  let state = store.getState();
  if (state.level < MAX_LEVEL) {
    if (action.type === ac.loadLevelAndTrial.type) {
      saveToLocalStorage(action.payload);
    }
    if (action.type === ac.opsReset.type) {
      let state = store.getState();
      saveToLocalStorage({level: state.level, trial: state.trial});
    }
    if (action.type === ac.opsNewTrial.type) {
      let state = store.getState();
      saveToLocalStorage({level: state.level, trial: state.trial + 1});
    }
  }
  if (action.type === ac.opsGameComplete.type) {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
  next(action);
}

export default saveLevelTrial;
