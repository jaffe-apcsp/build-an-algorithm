import ac  from '../reducer/actionCreators';
import {LOCAL_STORAGE_KEY, MAX_LEVEL} from "../utilities/constants";

const saveToLocalStorage = obj => {
  localStorage.setItem(obj.lsKey, JSON.stringify(obj));
}

const saveLevelTrial = store => next => action => {
  let state = store.getState();
  if (state.level < MAX_LEVEL) {
    if (action.type === ac.loadLevelAndTrial.type) {
      saveToLocalStorage({...action.payload, lsKey: state.lsKey});
    }
    if (action.type === ac.opsReset.type) {
      let state = store.getState();
      saveToLocalStorage({level: state.level, trial: state.trial, lsKey: state.lsKey});
    }
    if (action.type === ac.opsNewTrial.type) {
      let state = store.getState();
      saveToLocalStorage({level: state.level, trial: state.trial + 1, lsKey: state.lsKey});
    }
  }
  if (action.type === ac.opsGameComplete.type) {
    localStorage.removeItem(state.lsKey);
  }
  next(action);
}

export default saveLevelTrial;
