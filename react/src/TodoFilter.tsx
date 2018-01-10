import * as React from 'react';

enum FilterType {
  ALL,
  ACTIVE,
  COMPLETED,
}

interface ITodoFilterProps {
  filter: FilterType;
  onSwitchFilter: (newfilter: FilterType) => void;
}

function TodoFilter(props: ITodoFilterProps) {
  function getClassName(): { all: string, active: string, completed: string } {
    const selectedClassName = 'selected';

    return {
      active: (props.filter === FilterType.ACTIVE) ? selectedClassName : '',
      all: (props.filter === FilterType.ALL) ? selectedClassName : '',
      completed: (props.filter === FilterType.COMPLETED) ? selectedClassName : '',
    };
  }

  function onSwitchAll() {
    props.onSwitchFilter(FilterType.ALL);
  }

  function onSwitchActive() {
    props.onSwitchFilter(FilterType.ACTIVE);
  }

  function onSwitchCompleted() {
    props.onSwitchFilter(FilterType.COMPLETED);
  }

  const className = getClassName();

  return (
    <ul className="filters">
      <li>
        <a
          className={className.all}
          href="#/"
          onClick={onSwitchAll}
        >
          All
        </a>
      </li>
      <li>
        <a
          className={className.active}
          href="#/active"
          onClick={onSwitchActive}
        >
          Active
        </a>
      </li>
      <li>
        <a
          className={className.completed}
          href="#/completed"
          onClick={onSwitchCompleted}
        >
          Completed
        </a>
      </li>
    </ul>
  );
}

export default TodoFilter;
