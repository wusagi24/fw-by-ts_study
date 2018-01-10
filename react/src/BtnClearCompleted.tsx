import * as React from 'react';

function BtnClearCompleted(props) {
  return (
    <button
      className="clear-completed"
      onClick={props.onClearCompleted}
    >
      Clear completed
    </button>
  );
}

export default BtnClearCompleted;
