import * as React from 'react';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';

import * as API from './apis';

// TODO: enum FilterType をグローバルに
enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

interface IAppProps {}

interface IAppState {
  list: ITodo[];
  filter: FilterType;
}

class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState;

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      filter: FilterType.ALL,
      list: [],
    };

    this.getShowList = this.getShowList.bind(this);
    this.fetchList = this.fetchList.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.getCountTodo = this.getCountTodo.bind(this);
    this.toggleAllComplete = this.toggleAllComplete.bind(this);
    this.switchFilter = this.switchFilter.bind(this);
  }

  public componentDidMount() {
    this.fetchList();
  }

  public getShowList(): ITodo[] {
    switch (this.state.filter) {
      case FilterType.ALL: {
        return [].concat(this.state.list);
      }
      case FilterType.ACTIVE: {
        return this.state.list.filter((todo: ITodo): boolean => {
          return !todo.isCompleted;
        });
      }
      case FilterType.COMPLETED: {
        return this.state.list.filter((todo: ITodo): boolean => {
          return todo.isCompleted;
        });
      }
      default: {
        return [].concat(this.state.list);
      }
    }
  }

  public fetchList(): void {
    API.fetchTodoList()
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public addTodo(text: string): void {
    const newId = (this.state.list.length > 0) ?
      this.state.list[this.state.list.length - 1].id + 1 : 0;
    const newTodo: ITodo = {
      id: newId,
      isCompleted: false,
      text,
    };
    const addedList = this.state.list.concat([newTodo]);
    this.updateList(addedList);

    API.addTodo(text)
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public updateTodo(todo: ITodo): void {
    const updatedlist = this.state.list.map((prevTodo: ITodo): ITodo => {
      if (prevTodo.id === todo.id) {
        return todo;
      }
      return prevTodo;
    });
    this.updateList(updatedlist);

    API.updateTodo(todo)
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public deleteTodo(id: number): void {
    const deletedList = this.state.list.filter((todo: ITodo): boolean => {
      return !(todo.id === id);
    });
    this.updateList(deletedList);

    API.deleteTodo(id)
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public clearCompleted(): void {
    const clearedList = this.state.list.filter((todo: ITodo): boolean => {
      return !todo.isCompleted;
    });
    this.updateList(clearedList);

    API.clearCompleted()
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public getCountTodo(): ITodoCount {
    const initCount = { active: 0, all: 0 };
    return this.state.list.reduce(
      (total: ITodoCount, todo: ITodo): ITodoCount => {
        return {
          active: (!todo.isCompleted) ? total.active + 1 : total.active,
          all: total.all + 1,
        };
      },
      initCount,
    );
  }

  public toggleAllComplete(isComplete: boolean): void {
    const toggledList = this.state.list.map((todo: ITodo): ITodo => {
      return { ...todo, isCompleted: isComplete };
    });
    this.updateList(toggledList);

    API.updateTodoAll(toggledList)
      .then((list: ITodo[]): void => {
        this.updateList(list);
      });
  }

  public switchFilter(newfilter: FilterType): void {
    this.setState({
      filter: newfilter,
    });
  }

  public render() {
    const todoList = this.getShowList();
    const todoCount = this.getCountTodo();

    return (
      <section className="todoapp">
        <Header
          onAddTodo={this.addTodo}
        />
        <Main
          todoList={todoList}
          onToggleAllComplete={this.toggleAllComplete}
          onUpdateTodo={this.updateTodo}
          onDeleteTodo={this.deleteTodo}
        />
        <Footer
          todoCount={todoCount}
          filter={this.state.filter}
          onClearCompleted={this.clearCompleted}
          onSwitchFilter={this.switchFilter}
        />
      </section>
    );
  }

  protected updateList(newList: ITodo[]): void {
    this.setState({
      list: newList,
    });
  }
}

export default App;
