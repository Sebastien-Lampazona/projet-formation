import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import tasksData from 'src/data/tasks.json';
import './styles.scss';
import Tasks from 'src/components/Tasks';
import ThemeContext from 'src/commons/ThemeProvider';
import Modal from 'src/components/Modal/index';

function Home() {
  const [tasks, setTasks] = useState([]);
  const themeContext = useContext(ThemeContext);
  const modalRef = useRef(null);

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const addNewTask = useCallback(() => {
    const taskID = tasks.length + 1;
    setTasks([...tasks, { id: taskID, title: `New Task #${taskID}`, description: "Voici ma nouvelle tâche", priority: 3 }]);
    console.log('modalRef.current', modalRef.current);
    modalRef?.current?.open();
  }, [modalRef, tasks, setTasks]);

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

      {/* <Modal ref={modalRef}>
          TODO : Ajouter une tache
      </Modal> */}
    </div>
  );
}
export default Home;
