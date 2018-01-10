import * as React from 'react';

import BtnClearCompleted from './BtnClearCompleted';
import TodoCounter from './TodoCounter';
import TodoFilter from './TodoFilter';

enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

interface IFooterProps {
  todoCount: ITodoCount;
  filter: FilterType;
  onClearCompleted: () => void;
  onSwitchFilter: (newfilter: FilterType) => void;
}

function Footer(props: IFooterProps) {
  const clearCompletedArea = (props.todoCount.all - props.todoCount.active > 0) ? (
    <BtnClearCompleted onClearCompleted={props.onClearCompleted} />
  ) : '';

  return (
    <footer className="footer">
      <TodoCounter todoCount={props.todoCount} />
      <TodoFilter
        filter={props.filter}
        onSwitchFilter={props.onSwitchFilter}
      />
      {clearCompletedArea}
    </footer>
  );
}

export default Footer;
