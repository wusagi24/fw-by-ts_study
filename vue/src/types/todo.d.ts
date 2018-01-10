interface Todo {
  id: number;
  text: string;
  isCompleted: boolean;
}

interface TodoCount {
  all: number;
  active: number;
}

interface PromiseArray<T> extends Array<any> {
  [index: number]: Promise<T>;
}
