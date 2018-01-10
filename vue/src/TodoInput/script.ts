import Vue from 'vue';
import Component from 'vue-class-component';

import bus from '../bus';

@Component({
  name: 'TodoInput',
})
export default class TodoInput extends Vue {
  public newTodo: string = '';

  public addTodo(): void {
    this.emitAddTodo(this.newTodo);
    this.newTodo = '';
  }

  private emitAddTodo(text: string): void {
    bus.$emit('add-todo', text);
  }
}
