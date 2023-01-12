import React, { useEffect, useState } from 'react';
import Task from './Task';

import './styles.scss';

function Tasks({ tasks }) {
  return (
    <ul className="tasks-list">
        {tasks.map((task) => (<Task key={task.id} {...task} />))}
    </ul>
  );
}
export default Tasks;
