import Vue from 'vue';

import App from './App/index.vue';

new Vue({
  el: '#App',
  components: {
    app: App,
  },
  render: h => h('app'),
});
