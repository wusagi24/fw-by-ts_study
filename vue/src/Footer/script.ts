import Vue from 'vue';
import Component from 'vue-class-component';

import bus from '../bus';

import Filters from '../Filters/index.vue';

@Component({
  name: 'Footer',

  components: {
    'todo-filters': Filters,
  },
})
export default class Footer extends Vue {
  public count: TodoCount = {
    active: 0,
    all: 0,
  };

  public created(): void {
    bus.$on('change-todo-count', this.changeCount);
  }

  public destroyed(): void {
    bus.$off('change-todo-count', this.changeCount);
  }

  public changeCount(count: TodoCount): void {
    this.$set(this.count, 'all', count.all);
    this.$set(this.count, 'active', count.active);
  }

  public clearCompleted(): void {
    bus.$emit('clear-completed');
  }
}
