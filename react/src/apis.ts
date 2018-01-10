/* tslint:disable:no-console */
import Store from './Store';

const store = new Store();

export function fetchTodoList(): Promise<ITodo[]> {
  console.log('call API: fetchTodoList()');

  return store.getTodoAll()
    .catch(() => {
      // エラー処理
    }).then((list: ITodo[]): ITodo[] => {
      return list;
    });
}

export function addTodo(text: string): Promise<ITodo[]> {
  console.log(`call API: addTodo(text = ${text})`);

  return store.addTodo(text)
    .catch(() => {
      // エラー処理
    }).then((list: ITodo[]): ITodo[] => {
      return list;
    });
}

export function updateTodo(todo: ITodo): Promise<ITodo[]> {
  console.log(`call API: updateTodo(todo = ${JSON.stringify(todo)})`);

  return store.updateTodo(todo)
    .catch(() => {
      // エラー処理
    }).then((list: ITodo[]): ITodo[] => {
      return list;
    });
}

export function updateTodoAll(list: ITodo[]): Promise<ITodo[]> {
  console.log(`call API: updateTodoAll(todo = ${JSON.stringify(list)})`);

  const updates = list.map((todo: ITodo): Promise<ITodo[]> => {
    return store.updateTodo(todo);
  });
  return Promise.all(updates)
    .catch(() => {
      // エラー処理
    }).then((): Promise<ITodo[]> => {
      return store.getTodoAll();
    });
}

export function deleteTodo(id: number): Promise<ITodo[]> {
  console.log(`call API: deleteTodo(id = ${id})`);

  return store.deleteTodo(id)
    .catch(() => {
      // エラー処理
    }).then((list: ITodo[]): ITodo[] => {
      return list;
    });
}

export function clearCompleted(): Promise<ITodo[]> {
  console.log(`call API: clearCompleted()`);

  return store.clearCompleted()
    .catch(() => {
      // エラー処理
    }).then((list: ITodo[]): ITodo[] => {
      return list;
    });
}

export default {
  addTodo,
  clearCompleted,
  deleteTodo,
  fetchTodoList,
  updateTodo,
  updateTodoAll,
};
