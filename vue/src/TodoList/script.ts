import Vue from 'vue';
import Component from 'vue-class-component';

import TodoComponent from '../Todo/index.vue';

import * as API from '../apis';
import bus from '../bus';

enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

@Component({
  name: 'TodoList',

  components: {
    todo: TodoComponent,
  },

  watch: {
    todoCount: {
      deep: true,
      handler(count: TodoCount): void {
        bus.$emit('change-todo-count', count);
      },
    },
  },
})
export default class TodoList extends Vue {
  public list: Todo[] = [];
  public filter: FilterType = FilterType.ALL;
  public todoCount: TodoCount = { all: 0, active: 0 };

  public created(): void {
    this.fetchList();
    bus.$on('add-todo', this.addTodo);
    bus.$on('update-todo', this.updateTodo);
    bus.$on('delete-todo', this.deleteTodo);
    bus.$on('filtering', this.switchFilter);
    bus.$on('toggle-all-complete', this.toggleAllComplete);
    bus.$on('clear-completed', this.clearCompleted);
  }

  public destroyed(): void {
    bus.$off('add-todo', this.addTodo);
    bus.$off('update-todo', this.updateTodo);
    bus.$off('delete-todo', this.deleteTodo);
    bus.$off('filtering', this.switchFilter);
    bus.$off('toggle-all-complete', this.toggleAllComplete);
    bus.$off('clear-completed', this.clearCompleted);
  }

  get showList(): Todo[] {
    switch (this.filter) {
      case FilterType.ALL: {
        return [].concat(this.list);
      }
      case FilterType.ACTIVE: {
        return this.list.filter((todo: Todo): boolean => {
          return !todo.isCompleted;
        });
      }
      case FilterType.COMPLETED: {
        return this.list.filter((todo: Todo): boolean => {
          return todo.isCompleted;
        });
      }
      default: {
        return [].concat(this.list);
      }
    }
  }

  public updateList(list: Todo[]): void {
    this.list = list;

    const count = this.countTodo(list);
    this.$set(this.todoCount, 'all', count.all);
    this.$set(this.todoCount, 'active', count.active);
  }

  public fetchList(): void {
    API.fetchTodoList()
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public addTodo(text: string): void {
    const newId = (this.list.length > 0) ? this.list[this.list.length - 1].id + 1 : 0;
    const newTodo: Todo = {
      id: newId,
      isCompleted: false,
      text,
    };
    const addedList = this.list.concat([newTodo]);
    this.updateList(addedList);

    API.addTodo(text)
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public updateTodo(todo: Todo): void {
    const updatedlist = this.list.map((prevTodo: Todo): Todo => {
      if (prevTodo.id === todo.id) {
        return todo;
      }
      return prevTodo;
    });
    this.updateList(updatedlist);

    API.updateTodo(todo)
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public deleteTodo(id: number): void {
    const deletedList = this.list.filter((todo: Todo): boolean => {
      return !(todo.id === id);
    });
    this.updateList(deletedList);

    API.deleteTodo(id)
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public toggleAllComplete(isComplete: boolean): void {
    const toggledList = this.list.map((todo: Todo): Todo => {
      return { ...todo, isCompleted: isComplete };
    });
    this.updateList(toggledList);

    API.updateTodoAll(this.list)
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public clearCompleted(): void {
    const clearedList = this.list.filter((todo: Todo): boolean => {
      return !todo.isCompleted;
    });
    this.updateList(clearedList);

    API.clearCompleted()
      .then((list: Todo[]): void => {
        this.updateList(list);
      });
  }

  public switchFilter(filter: FilterType): void {
    this.filter = filter;
  }

  public countTodo(list: Todo[]): TodoCount {
    return list.reduce((total: TodoCount, todo: Todo): TodoCount => {
      return {
        active: (!todo.isCompleted) ? total.active + 1 : total.active,
        all: total.all + 1,
      };
    }, { all: 0, active: 0 });
  }
}
