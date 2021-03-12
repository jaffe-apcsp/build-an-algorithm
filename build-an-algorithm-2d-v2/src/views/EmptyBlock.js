import React from 'react';
import { connect } from 'react-redux';

const EmptyBlock = () => {
  return (
    <div className="code-block-empty" />
  );
}

export default connect()(EmptyBlock);
