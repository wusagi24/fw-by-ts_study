import Vue from 'vue';
import Component from 'vue-class-component';

import bus from '../bus';

// TODO: プロジェクト全体で共有の enum にする
enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

@Component({
  name: 'Filters',
})
export default class Filters extends Vue {
  public FilterType = FilterType;
  public filter: FilterType = FilterType.ALL;

  public created() {
    const hash = window.location.hash.split('/').pop();
    if (hash && hash.length) {
      this.filter = FilterType[hash.toUpperCase()];
    }
    this.switchFilter(this.filter);
  }

  public switchFilter(type: FilterType): void {
    this.filter = type;
    bus.$emit('filtering', this.filter);
  }
}
