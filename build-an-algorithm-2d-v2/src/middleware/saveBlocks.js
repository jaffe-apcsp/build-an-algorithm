import ac  from '../reducer/actionCreators';
import {LOCAL_STORAGE_BLOCK_KEY} from "../utilities/constants";

const saveToLocalStorage = obj => {
  localStorage.setItem(LOCAL_STORAGE_BLOCK_KEY, JSON.stringify(obj));
}

const saveBlocks = store => next => action => {
  // Check if we need to load the saved blocks from localStorage on startup
  if (action.type === ac.loadSavedBlocks.type) {
    store.dispatch(ac.setBlocks(action.payload));
  }

  // Now update the block state first
  next(action);

  // and save the blocks if there's been a change in them
  if (
    (action.type === ac.codeBlockClicked.type) ||
    (action.type === ac.iterationsUp.type) ||
    (action.type === ac.iterationsDown.type)
  ) {
    const state = store.getState();
    const { main, p1, p2, l1, l2 } = state;
    saveToLocalStorage({main, p1, p2, l1, l2});
  }
}

export default saveBlocks;
