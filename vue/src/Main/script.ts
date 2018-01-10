import Vue from 'vue';
import Component from 'vue-class-component';

import bus from '../bus';

import TodoList from '../TodoList/index.vue';

@Component({
  name: 'Main',

  components: {
    'todo-list': TodoList,
  },

  watch: {
    isAllCompleted(isCompleted: boolean): void {
      bus.$emit('toggle-all-complete', isCompleted);
    },
  },
})
export default class Main extends Vue {
  public isAllCompleted: boolean = false;
}
