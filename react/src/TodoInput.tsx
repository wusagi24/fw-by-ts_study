import * as React from 'react';

enum KEY_CODE {
  ENTER = 13,
  ESCAPE = 27,
}

interface ITodoInputProps {
  onAddTodo: (text: string) => void;
}

interface ITodoInputState {
  inputText: string;
}

class TodoInput extends React.Component<ITodoInputProps, ITodoInputState> {
  constructor(props: ITodoInputProps) {
    super(props);

    this.state = {
      inputText: '',
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  public onChangeText(evt): void {
    const text = evt.target.value;

    this.setState({
      inputText: text,
    });
  }

  public onKeyDown(evt): void {
    const downKeyCode = evt.keyCode;
    if (downKeyCode !== KEY_CODE.ENTER) {
      return;
    }
    evt.preventDefault();

    this.onAddTodo();
  }

  public onAddTodo(): void {
    const text = this.state.inputText.trim();
    this.props.onAddTodo(text);
    this.setState({
      inputText: '',
    });
  }

  public render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.onChangeText}
        onKeyDown={this.onKeyDown}
        value={this.state.inputText}
        autoFocus={true}
      />
    );
  }
}

export default TodoInput;
