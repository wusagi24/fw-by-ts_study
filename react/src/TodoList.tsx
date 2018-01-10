import * as React from 'react';

import TodoComponent from './TodoComponent';

interface ITodoListProps {
  todoList: ITodo[];
  onUpdateTodo: (todo: ITodo) => void;
  onDeleteTodo: (id: number) => void;
}

function TodoList(props: ITodoListProps) {
  const todoList = props.todoList.map((todo: ITodo) => {
    return (
      <TodoComponent
        todo={todo}
        key={todo.id}
        onUpdateTodo={props.onUpdateTodo}
        onDeleteTodo={props.onDeleteTodo}
      />
    );
  });

  return (
    <ul className="todo-list">
      {todoList}
    </ul>
  );
}

export default TodoList;
