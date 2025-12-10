import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task as TaskType, FilterType } from './types/task';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');

  const addTask = useCallback(
    (nome: string, categoria?: string) => {
      if (nome.trim() === '') return;
      const nomeCapitalized = nome.trim().charAt(0).toUpperCase() + nome.trim().slice(1);

      const newTask: TaskType = {
        id: Date.now(),
        nome: nomeCapitalized,
        completata: false,
        categoria,
        dataCreazione: new Date(),
        dataModifica: new Date(),
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: number) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id: number) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                completata: !task.completata,
                dataModifica: new Date(),
              }
            : task
        )
      );
    },
    [setTasks]
  );

  const editTask = useCallback(
    (id: number, nuovoNome: string) => {
      if (nuovoNome.trim() === '') return;

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                nome: nuovoNome.trim(),
                dataModifica: new Date(),
              }
            : task
        )
      );

      setEditingId(null);
      setEditingText('');
    },
    [setTasks]
  );

  const handleStartEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleUpdateEditingText = (text: string) => {
    setEditingText(text);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completata;
    if (filter === 'completed') return task.completata;
    return true;
  });

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <div className="container">
          
          {/* Stats */}
          <div className="mb-3">
            <TaskStats tasks={tasks} />
          </div>

          {/* Form */}
          <div className="mb-3">
            <TaskForm onAddTask={addTask} />
          </div>

          {/* Filtri */}
          <div className="d-flex justify-content-center gap-2 mb-3">
            <button
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              Tutti ({tasks.length})
            </button>
            <button
              className={`btn btn-sm ${filter === 'active' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('active')}
            >
              Attivi ({tasks.filter((t) => !t.completata).length})
            </button>
            <button
              className={`btn btn-sm ${filter === 'completed' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setFilter('completed')}
            >
              Completati ({tasks.filter((t) => t.completata).length})
            </button>
          </div>

          {/* ✅ GRIGLIA ORIZZONTALE - 4 card per riga */}
          <div className="row g-3">
            {filteredTasks.length === 0 ? (
              <div className="col-12">
                <div className="alert alert-info text-center">
                  Nessun task. Inizia creandone uno! 🚀
                </div>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="col-12 col-sm-6 col-md-4 col-xl-3"
                >
                  <Task
                    task={task}
                    isEditing={editingId === task.id}
                    editingText={editingText}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    onStartEdit={handleStartEdit}
                    onUpdateEditingText={handleUpdateEditingText}
                    onCancelEdit={() => {
                      setEditingId(null);
                      setEditingText('');
                    }}
                  />
                </div>
              ))
            )}
          </div>

          {/* Elimina completati */}
          {tasks.some((t) => t.completata) && (
            <div className="text-center mt-4">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setTasks((prev) => prev.filter((t) => !t.completata))}
              >
                🗑️ Elimina completati
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
