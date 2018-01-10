import * as React from 'react';

enum KEY_CODE {
  ENTER = 13,
  ESCAPE = 27,
}

interface ITodoProps {
  todo: ITodo;
  onUpdateTodo: (todo: ITodo) => void;
  onDeleteTodo: (id: number) => void;
}

interface ITodoState {
  text: string;
  editing: boolean;
}

class TodoComponent extends React.Component<ITodoProps, ITodoState> {
  public state: ITodoState;

  constructor(props: ITodoProps) {
    super(props);

    this.state = {
      editing: false,
      text: props.todo.text,
    };

    this.onToggleCompleted = this.onToggleCompleted.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onUpdateText = this.onUpdateText.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditMode = this.onEditMode.bind(this);
  }

  public getClassName(): { li: string } {
    const liClassName = (() => {
      if (this.props.todo.isCompleted) {
        return 'completed';
      }
      if (this.state.editing) {
        return 'editing';
      }
      return '';
    })();

    return {
      li: liClassName,
    };
  }

  public onToggleCompleted(): void {
    const newTodo = { ...this.props.todo, isCompleted: !this.props.todo.isCompleted };
    this.props.onUpdateTodo(newTodo);
  }

  public onChangeText(evt: ITextInputEvent): void {
    const text = evt.target.value.trim();

    this.setState({
      text,
    });
  }

  public onKeyDown(evt: React.KeyboardEvent<any>): void {
    const downKeyCode = evt.keyCode;
    evt.preventDefault();

    if (downKeyCode === KEY_CODE.ESCAPE) {
      this.onCancelEditMode();
    } else if (downKeyCode === KEY_CODE.ENTER) {
      this.onUpdateText();
    }
  }

  public onUpdateText(): void {
    const newTodo = { ...this.props.todo, text: this.state.text };
    this.props.onUpdateTodo(newTodo);
  }

  public onCancelEditMode(): void {
    this.setState({
      editing: false,
    });
  }

  public onDelete(): void {
    this.props.onDeleteTodo(this.props.todo.id);
  }

  public onEditMode(): void {
    this.setState({
      editing: true,
    });
  }

  public render() {
    const className = this.getClassName();
    const text = this.state.text;

    return (
      <li className={className.li}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.isCompleted}
            onChange={this.onToggleCompleted}
          />
          <label onDoubleClick={this.onEditMode}>{text}</label>
          <button
            className="destroy"
            onClick={this.onDelete}
          />
        </div>
        <input
          className="edit"
          type="text"
          value={text}
          onChange={this.onChangeText}
          onBlur={this.onUpdateText}
          onKeyDown={this.onKeyDown}
        />
      </li>
    );
  }
}

export default TodoComponent;
