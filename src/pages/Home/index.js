import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import TasksList from 'src/pages/Home/components/TasksList'
import Button from 'src/components/Button';

import tasksData from 'src/data/tasks.json';
import './styles.scss';
import Modal from 'src/components/Modal';

function Home() {
  // On se prépare à stocker la donnée pour pouvoir la faire évoluer par la suite
  const [tasks, setTasks] = useState([]);
  const [color, setColor] = useState('color1');
  const modalRef = useRef(null);

  // On utilise le useEffect pour simuler la récupération de données via un api par exemple
  useEffect(() => {
    // On attend 1 seconde avant de stocker la donnée dans le state
    setTimeout(() => {
      setTasks(tasksData);
    }, 1000);
  }, []);

  const addTask = useCallback(() => {
    modalRef.current.open();
    const newID = tasks.length + 1;
    setTasks([{
      "id": newID,
      "title": `Ma nouvelle tache #${newID}`,
      "description": null,
      "priority": 2,
      "state": "todo"
    }, ...tasks]);
  }, [tasks]);

  const changeColor = useCallback(() => {
    setColor(color + 1)
  }, [color]);

  const colorTxt = useMemo(() => `Changer la couleur ${color}`, [color])


  const taskFiltered = useMemo(() => tasks.filter((task) => task.state === "done"), [tasks]);
  return (
    <div className="home-container">
      <nav className="home-nav">
        <h1 className="title-home">Home Page</h1>
      </nav>

      <main>
        <h2>TODO List</h2>
        <TasksList tasks={taskFiltered} />
        <Button onClick={addTask}>
          Ajouter une tâche
        </Button>
        <Button onClick={changeColor}>{colorTxt}</Button>
      </main>
       <Modal ref={modalRef} />

    </div>
  );
}

export default Home;
