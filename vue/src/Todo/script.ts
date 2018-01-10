import Vue from 'vue';
import Component from 'vue-class-component';

import bus from '../bus';

@Component({
  name: 'Todo',

  props: ['todo'],
})
export default class Todo extends Vue {
  public isEditing: boolean = false;
  public prevText: string = this['todo'].text;

  public toggleCompleted(): void {
    const id = this['todo'].id;
    const isCompleted = this['todo'].isCompleted;
    Vue.set(this['todo'], 'isCompleted', !isCompleted);

    this.emitUpdateTodo(this['todo']);
  }

  public editText(): void {
    this.prevText = this['todo'].text;
    this.isEditing = true;

    this.$nextTick(function () {
      const input = this.$el.getElementsByClassName('edit')[0] as HTMLElement;
      input.focus();
    });
  }

  public updateText(): void {
    this.prevText = this['todo'].text;
    this.isEditing = false;

    this.emitUpdateTodo(this['todo']);
  }

  public cancelEdit(): void {
    Vue.set(this['todo'], 'text', this.prevText);
    this.isEditing = false;
  }

  public deleteTodo(): void {
    this.emitDeleteTodo(this['todo'].id);
  }

  private emitUpdateTodo(todo: Todo): void {
    bus.$emit('update-todo', todo);
  }

  private emitDeleteTodo(id: number): void {
    bus.$emit('delete-todo', id);
  }
}
