// src/components/TaskForm.tsx
// Form per aggiungere nuovi task con categoria
// Dimostra: form handling, validation, controlled inputs

import React, { useState } from 'react';

interface TaskFormProps {
  onAddTask: (nome: string, categoria?: string) => void;
}

const CATEGORIES = ['Development', 'Work', 'Personal', 'Shopping', 'Other'];

/**
 * TaskForm Component - Form per aggiungere task
 *
 * Features:
 * ✅ Input validazione
 * ✅ Select categoria
 * ✅ Submit handling
 * ✅ Input reset dopo submit
 * ✅ Accessibilità (labels, aria-*)
 */
export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [taskName, setTaskName] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✨ Validazione
    if (taskName.trim() === '') {
      setError('Il task non può essere vuoto');
      return;
    }

    // ✨ Call parent function
    onAddTask(taskName, category || undefined);

    // ✨ Reset form
    setTaskName('');
    setCategory('');
    setError('');
  };

  return (
    <div className="task-form-wrapper mb-4">
      <form onSubmit={handleSubmit} className="card p-4 bg-light">
        <h5 className="card-title mb-4">➕ Aggiungi nuovo task</h5>

        {error && <div className="alert alert-danger alert-sm">{error}</div>}

        <div className="row g-3">
          {/* ✨ Task name input */}
          <div className="col-12 col-md-6">
            <label htmlFor="taskInput" className="form-label">
              Task *
            </label>
            <input
              id="taskInput"
              type="text"
              className="form-control"
              placeholder="Es: Imparare TypeScript"
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
                if (error) setError(''); // Cancella errore quando l'utente digita
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e as any);
                }
              }}
              aria-describedby="taskHelp"
            />
            <small id="taskHelp" className="form-text text-muted">
              Cosa vuoi fare?
            </small>
          </div>

          {/* ✨ Category select */}
          <div className="col-12 col-md-4">
            <label htmlFor="categorySelect" className="form-label">
              Categoria (opzionale)
            </label>
            <select
              id="categorySelect"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Senza categoria --</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* ✨ Submit button */}
          <div className="col-12 col-md-2 d-flex align-items-end">
            <button
              type="submit"
              className="btn btn-primary w-100"
              aria-label="Aggiungi task"
            >
              Aggiungi
            </button>
          </div>
        </div>

        {/* ✨ Help text */}
        <div className="form-text mt-2">
          💡 Premi Enter nel campo task per aggiungere rapidamente
        </div>
      </form>
    </div>
  );
}
