import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  iterationsLeft: ownProps.iterationsLeft
});

const Iterations = props => {

  return (
    <div className="iterations">
      <span>{`Iterations left: ${props.iterationsLeft+1}`}</span>
    </div>
  )
  ;
}

const actionCreators = {};

export default connect(
  mapStateToProps,
  actionCreators
)(Iterations);
