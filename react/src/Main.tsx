import * as React from 'react';

import TodoList from './TodoList';

interface IMainProps {
  todoList: ITodo[];
  onToggleAllComplete: (isComplete: boolean) => void;
  onUpdateTodo: (todo: ITodo) => void;
  onDeleteTodo: (id: number) => void;
}

interface IMainState {
  toggleAll: boolean;
}

class Main extends React.Component<IMainProps, IMainState> {
  public state: IMainState;

  constructor(props: IMainProps) {
    super(props);

    this.state = {
      toggleAll: false,
    };

    this.onToggleAll = this.onToggleAll.bind(this);
  }

  public onToggleAll(): void {
    const toggleState = !this.state.toggleAll;

    this.setState({
      toggleAll: toggleState,
    });
    this.props.onToggleAllComplete(toggleState);
  }

  public render() {
    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onClick={this.onToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList
          todoList={this.props.todoList}
          onUpdateTodo={this.props.onUpdateTodo}
          onDeleteTodo={this.props.onDeleteTodo}
        />
      </section>
    );
  }
}

export default Main;
