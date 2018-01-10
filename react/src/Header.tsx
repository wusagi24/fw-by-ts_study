import * as React from 'react';

import TodoInput from './TodoInput';

interface IHeadreProps {
  onAddTodo: (text: string) => void;
}

function Header(props: IHeadreProps) {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoInput onAddTodo={props.onAddTodo} />
    </header>
  );
}

export default Header;
