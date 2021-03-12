import React from 'react';
import { connect } from 'react-redux';
import CodeBlock from "./CodeBlock";
import ac from "../reducer/actionCreators";

const mapStateToProps = (state, ownProps) => {
  return {
    blocksAvailable: state.blocksAvailable,
    onClick: ownProps.onClick
  }
}

const BlockPalette = props => {

  const onClick = parms => {
    props.codeBlockClicked(parms);
  }

  return (
    <div className="code-window">
      <table>
        <tbody>
        <tr>
          {
            props.blocksAvailable.map((block, idx) =>
              <td key={'cb'+idx}>
                <CodeBlock name={'palette'} onClick={onClick} block={block} index={idx} />
              </td>
            )
          }
        </tr>
        </tbody>
      </table>
    </div>
  );
}

const actionCreators = {codeBlockClicked: ac.codeBlockClicked};

export default connect(
  mapStateToProps,
  actionCreators
)(BlockPalette);
