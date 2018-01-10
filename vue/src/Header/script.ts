import Vue from 'vue';
import Component from 'vue-class-component';

import TodoInput from '../TodoInput/index.vue';

@Component({
  name: 'Header',

  components: {
    'todo-input': TodoInput,
  },
})
export default class Header extends Vue {
}
