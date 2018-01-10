interface ITodo {
  id: number;
  isCompleted: boolean;
  text: string;
}

interface ITodoCount {
  all: number;
  active: number;
}

interface IPromiseArray<T> extends Array<any> {
  [index: number]: Promise<T>;
}

interface ITextInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement;
}
