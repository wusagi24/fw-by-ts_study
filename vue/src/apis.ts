/* tslint:disable:no-console */
import Store from './Store';

const store = new Store();

export function fetchTodoList(): Promise<Todo[]> {
  console.log('call API: fetchTodoList()');

  return store.getTodoAll()
    .catch(() => {
      // エラー処理
    }).then((list: Todo[]) => {
      return list;
    });
}

export function addTodo(text: string): Promise<Todo[]> {
  console.log(`call API: addTodo(text = ${text})`);

  return store.addTodo(text)
    .catch(() => {
      // エラー処理
    }).then((list: Todo[]) => {
      return list;
    });
}

export function updateTodo(todo: Todo): Promise<Todo[]> {
  console.log(`call API: updateTodo(todo = ${JSON.stringify(todo)})`);

  return store.updateTodo(todo)
    .catch(() => {
      // エラー処理
    }).then((list: Todo[]) => {
      return list;
    });
}

export function updateTodoAll(list: Todo[]): Promise<Todo[]> {
  console.log(`call API: updateTodoAll(todo = ${JSON.stringify(list)})`);

  const updates = list.map((todo: Todo) => {
    return store.updateTodo(todo);
  });
  return Promise.all(updates)
    .catch(() => {
      // エラー処理
    }).then(() => {
      return store.getTodoAll();
    });
}

export function deleteTodo(id: number): Promise<Todo[]> {
  console.log(`call API: deleteTodo(id = ${id})`);

  return store.deleteTodo(id)
    .catch(() => {
      // エラー処理
    }).then((list: Todo[]) => {
      return list;
    });
}

export function clearCompleted(): Promise<Todo[]> {
  console.log(`call API: clearCompleted()`);

  return store.clearCompleted()
    .catch(() => {
      // エラー処理
    }).then((list: Todo[]) => {
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
