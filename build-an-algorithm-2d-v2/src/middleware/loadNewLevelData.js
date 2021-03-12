import ac from "../reducer/actionCreators";
const { loadLevelAndTrial, setLevelData, setFetchError, opsReset } = ac;

const loadNewLevelData = store => next => action => {
  if (action.type === loadLevelAndTrial.type) {
    let level = action.payload.level;
    let levelFileName = './levels/' + (level + 1) + '.json';
    fetch(levelFileName, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        store.dispatch(setLevelData(data));
        next(action);
        store.dispatch(opsReset());
      })
      .catch(err => {
        console.log(err);
        store.dispatch(setFetchError(err));
        next(action);
      })
  } else {
    next(action);
  }
}

export default loadNewLevelData;
