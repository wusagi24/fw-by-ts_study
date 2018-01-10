import Vue from 'vue';
import Component from 'vue-class-component';

import Header from '../Header/index.vue';
import Main from '../Main/index.vue';
import Footer from '../Footer/index.vue';

@Component({
  name: 'App',

  components: {
    'todo-header': Header,
    'todo-main': Main,
    'todo-footer': Footer,
  },
})
export default class App extends Vue {
}
