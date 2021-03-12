import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  help: state.help
});

const Help = props => {

  return (props.help.length > 0) ?
    (
      <div className="help">
        <div className="help-container">
          {
            props.help ? props.help.map((line, idx) => <h2 key={'hel['+idx}>{line}</h2>) : null
          }
        </div>
      </div>
    ) : null
}

export default connect(
 mapStateToProps
)(Help);
