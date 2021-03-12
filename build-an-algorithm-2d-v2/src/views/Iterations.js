import React from 'react';
import { connect } from 'react-redux';
import { GrAdd, GrSubtract } from "react-icons/gr";

const mapStateToProps = (state, ownProps) => ({
  iterations: ownProps.iterations,
  up: ownProps.up,
  down: ownProps.down
});

const Iterations = props => {

  return (
    <div className="iterations">
      <span>{`Iterations: ${props.iterations}`}</span>
      <button onClick={props.up}><GrAdd /></button>
      <button onClick={props.down}><GrSubtract /></button>
    </div>
  )
  ;
}

const actionCreators = {};

export default connect(
  mapStateToProps,
  actionCreators
)(Iterations);
