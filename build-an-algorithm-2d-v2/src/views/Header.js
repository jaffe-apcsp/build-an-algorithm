import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  level: state.level+1,
  trial: state.trial+1,
  title: state.levelData ? state.levelData.title : 'Unknown'
});

const Header = props => {

  return (
    <div className="header">
      <p>Build an Algorithm: {props.title} (Level {props.level} | Trial {props.trial})</p>
    </div>
  );
}

const actionCreators = {};

export default connect(
  mapStateToProps,
  actionCreators
)(Header);
