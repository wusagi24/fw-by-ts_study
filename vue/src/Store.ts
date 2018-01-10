/* tslint:disable:no-console */
export default class Store {
  public static readonly DB_NAME: string = 'Vue-TODO';
  public static readonly DB_VERSION: number = 1;
  public static readonly DB_STORE_NAME: string = 'TODO-List';

  public db: IDBDatabase;

  /**
   * IndexedDB との接続を開く
   */
  public async open(): Promise<void> {
    const result = await this.openDB();
    return result;
  }

  /**
   * IndexedDB との接続を閉じる
   */
  public async close(): Promise<void> {
    const result = await this.closeDB();
    return result;
  }

  /**
   * 文字列から新たな Todo を追加する
   */
  public async addTodo(text: string): Promise<Todo[]> {
    if (!this.db) {
      await this.openDB();
    }
    await this.addTodoObject(text);
    const list: Todo[] = await this.getAllTodoObject();
    return list;
  }

  /**
   * id を元に Todo を取得する
   */
  // public async getTodo(id: number): Promise<Todo[]> {
  //   // TODO: 指定の TODO を取得する処理
  // }

  /**
   * 全ての Todo を取得する
   */
  public async getTodoAll(): Promise<Todo[]> {
    if (!this.db) {
      await this.openDB();
    }
    const list: Todo[] = await this.getAllTodoObject();
    return list;
  }

  /**
   * 指定の Todo を更新する
   */
  public async updateTodo(todo: Todo): Promise<Todo[]> {
    if (!this.db) {
      await this.openDB();
    }
    await this.updateTodoObject(todo);
    const list: Todo[] = await this.getAllTodoObject();
    return list;
  }

  /**
   * id を元に該当の Todo を削除する
   */
  public async deleteTodo(id: number): Promise<Todo[]> {
    if (!this.db) {
      await this.openDB();
    }
    await this.deleteTodoObject(id);
    const list: Todo[] = await this.getAllTodoObject();
    return list;
  }

  /**
   * 完了済み Todo を全て削除する
   */
  public async clearCompleted(): Promise<Todo[]> {
    if (!this.db) {
      await this.openDB();
    }
    await this.clearCompletedTodoObject();
    const list: Todo[] = await this.getAllTodoObject();
    return list;
  }

  /**
   * Todo リストをクリアする
   */
  public async clearTodoList(): Promise<boolean> {
    if (!this.db) {
      await this.openDB();
    }
    const result = await this.clearObjectStore(Store.DB_STORE_NAME)
      .catch((): boolean => {
        return false;
      }).then((): boolean => {
        return true;
      });
    return result;
  }

  protected openDB(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      console.log('openDB ...');

      const req: IDBOpenDBRequest = indexedDB.open(Store.DB_NAME, Store.DB_VERSION);

      req.onsuccess = (evt): void => {
        this.db = req.result;
        console.log('openDB done');
        resolve();
      };

      req.onerror = (evt): void => {
        console.error(`openDB: ${(evt.target as IDBRequest).error}`);
        reject();
      };

      req.onupgradeneeded = (evt): void => {
        console.log('openDB.onupgradeneeded');
        const store: IDBObjectStore = (evt.target as IDBRequest).result
          .createObjectStore(
            Store.DB_STORE_NAME,
            { keyPath: 'id', autoIncrement: true });
      };
    });
  }

  protected closeDB(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.db.close();
      resolve();
    });
  }

  protected getObjectStore(name: string, mode: string = 'readonly'): IDBObjectStore {
    const tx = this.db.transaction(name, (mode as IDBTransactionMode));
    return tx.objectStore(name);
  }

  protected clearObjectStore(name: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const store = this.getObjectStore(name, 'readwrite');
      const req = store.clear();

      req.onsuccess = (): void => {
        resolve();
      };

      req.onerror = (evt): void => {
        console.error(`clearObjectStore: ${(evt.target as IDBRequest).error}`);
        reject();
      };
    });
  }

  protected getAllTodoObject(): Promise<Todo[]> {
    return new Promise<Todo[]>((resolve, reject) => {
      const store = this.getObjectStore(Store.DB_STORE_NAME);
      const req = store.openCursor();
      const list = [];

      req.onsuccess = (evt) => {
        const cursor = (evt.target as IDBRequest).result;
        if (cursor) {
          const todo: Todo = {
            id: cursor.key,
            isCompleted: cursor.value.isCompleted,
            text: cursor.value.text,
          };
          list.push(todo);
          cursor.continue();
        } else {
          resolve(list);
        }
      };

      req.onerror = (evt) => {
        console.error(`getAllTodoObject: ${(evt.target as IDBRequest).error}`);
        reject();
      };
    });
  }

  protected addTodoObject(text: string): Promise<Todo> {
    return new Promise<Todo>((resolve, reject) => {
      const data = {
        isCompleted: false,
        text,
      };

      const store = this.getObjectStore(Store.DB_STORE_NAME, 'readwrite');
      const req = store.add(data);

      req.onsuccess = (evt): void => {
        resolve();
      };

      req.onerror = (evt): void => {
        console.error(`addTodoObject: ${(evt.target as IDBRequest).error}`);
        reject();
      };
    });
  }

  protected updateTodoObject(todo: Todo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const store = this.getObjectStore(Store.DB_STORE_NAME, 'readwrite');
      const req = store.put(todo);

      req.onsuccess = (evt): void => {
        resolve();
      };

      req.onerror = (evt): void => {
        console.error(`updateTodoObject: ${(evt.target as IDBRequest).error}`);
        reject();
      };
    });
  }

  protected deleteTodoObject(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const store = this.getObjectStore(Store.DB_STORE_NAME, 'readwrite');
      const req = store.delete(id);

      req.onsuccess = (evt): void => {
        resolve();
      };

      req.onerror = (evt): void => {
        console.error(`deleteTodoObject: ${(evt.target as IDBRequest).error}`);
        reject();
      };
    });
  }

  protected async clearCompletedTodoObject(): Promise<void> {
    const delTaskList = await this.getAllTodoObject().then((list: Todo[]): PromiseArray<void> => {
      return list.reduce(
        (delTasks: PromiseArray<void>, todo: Todo): PromiseArray<void> => {
          if (todo.isCompleted) {
            const task = this.deleteTodoObject(todo.id);
            return delTasks.concat([task]);
          }
          return delTasks;
        },
        [],
      );
    });

    const result =  await Promise.all(delTaskList).catch((err) => {
      console.error(`clearCompletedTodoObject: ${err}`);
    }).then(() => {
      return Promise.resolve();
    });

    return result;
  }
}
