import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import tasksData from 'src/data/tasks.json';
import './styles.scss';
import Tasks from 'src/components/Tasks';
import ThemeContext from 'src/commons/ThemeProvider';

function Home() {
  const [tasks, setTasks] = useState([]);
  const themeContext = useContext(ThemeContext);


  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const addNewTask = useCallback(() => {
    const taskID = tasks.length + 1;
    setTasks([...tasks, { id: taskID, title: `New Task #${taskID}`, description: "Voici ma nouvelle tâche", priority: 3 }])
  }, [tasks, setTasks]);

  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="title-home">TODO List</h1>
      </nav>

      <main>
        <Tasks tasks={tasks} />
      </main>
      <aside className="actions">
        <button
          type="button"
          onClick={addNewTask}
          className={`btn btn-${themeContext.theme === 'primary' ? 'secondary' : 'primary'} add-task`}
        >Ajouter une tâche</button>
      </aside>
    </div>
  );
}
export default Home;
