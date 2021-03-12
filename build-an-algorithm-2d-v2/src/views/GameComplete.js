import React from 'react';
import { connect } from 'react-redux';
import { MAX_LEVEL } from "../utilities/constants";

const GameComplete = () => {

  return (
    <div className="game-complete">
      <p>Congratulations! You've completed all {MAX_LEVEL} levels!</p>
    </div>
  );
}

export default connect()(GameComplete);
