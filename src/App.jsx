import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  // Stato per la lista dei task
  const [tasks, setTasks] = useState([]);
  // Stato per il testo del nuovo task
  const [newTask, setNewTask] = useState("");

  // Carica i task dal localStorage solo al primo render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Salva i task su localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Aggiunge un nuovo task alla lista
  const addTask = () => {
    if (newTask.trim() === "") return; // Non aggiunge task vuoti
    setTasks([
      ...tasks,
      {
        id: Date.now(), // id unico
        nome: newTask,
        completata: false
      }
    ]);
    setNewTask(""); // Svuota il campo input
  };

  // Elimina un task in base all'id
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Cambia lo stato di completamento di un task
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completata: !task.completata }
          : task
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        {/* Form per aggiungere un nuovo task */}
        <TaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />

        {/* Lista dei task */}
        <div className="mt-4">
          {tasks.map((task) => (
            <Task
              key={task.id}
              nome={task.nome}
              completata={task.completata}
              onDelete={() => deleteTask(task.id)}
              onToggle={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
