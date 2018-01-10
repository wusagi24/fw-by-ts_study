import * as React from 'react';

interface ITodoCounterProps {
  todoCount: ITodoCount;
}

function TodoCounter(props: ITodoCounterProps) {
  return (
    <span className="todo-count">
      <strong>{props.todoCount.active}</strong> item left
    </span>
  );
}

export default TodoCounter;
