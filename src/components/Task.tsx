// src/components/Task.tsx
// Componente singolo task con edit inline
// Dimostra: event handling, inline editing, conditional rendering

import { useState } from 'react';
import { Task as TaskType } from '../types/task';

interface TaskProps {
  task: TaskType;
  isEditing: boolean;
  editingText: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onStartEdit: (id: number, text: string) => void;
  onUpdateEditingText: (text: string) => void;
  onCancelEdit: () => void;
}

/**
 * Task Component - Rappresenta un singolo task
 *
 * Features:
 * ✅ Checkbox per marcare come completato
 * ✅ Edit inline (doppio click per modificare)
 * ✅ Delete button con conferma
 * ✅ Category badge
 * ✅ Data creazione
 */
export default function Task({
  task,
  isEditing,
  editingText,
  onToggle,
  onDelete,
  onEdit,
  onStartEdit,
  onUpdateEditingText,
  onCancelEdit,
}: TaskProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEdit(task.id, editingText);
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <div className={`task-card card ${task.completata ? 'completed' : ''}`}>
      <div className="card-body d-flex align-items-start gap-3">
        {/* ✨ Checkbox */}
        <input
          type="checkbox"
          className="form-check-input mt-1"
          checked={task.completata}
          onChange={() => onToggle(task.id)}
          aria-label="Segna come completato"
        />

        {/* ✨ Task content */}
        <div className="task-content flex-grow-1">
          {isEditing ? (
            // ✨ Edit mode
            <div className="edit-input-group">
              <input
                type="text"
                className="form-control form-control-sm mb-2"
                value={editingText}
                onChange={(e) => {
                  onUpdateEditingText(e.target.value)
                }}
                onKeyDown={handleKeyDown}
                autoFocus
                onBlur={() => onCancelEdit()}
              />
            </div>
          ) : (
            // ✨ View mode
            <>
              <h5
                className="task-title mb-2"
                onDoubleClick={() => onStartEdit(task.id, task.nome)}
                style={{
                  cursor: 'pointer',
                  textDecoration: task.completata ? 'line-through' : 'none',
                  opacity: task.completata ? 0.6 : 1,
                }}
              >
                {task.nome}
              </h5>

              {/* ✨ Category badge */}
              {task.categoria && (
                <span className="badge bg-info mb-2">{task.categoria}</span>
              )}

              {/* ✨ Meta info */}
              <div className="task-meta">
                <small className="text-muted">
                  📅 {new Date(task.dataCreazione).toLocaleDateString('it-IT')}
                </small>
              </div>
            </>
          )}
        </div>

        {/* ✨ Action buttons */}
        {!isEditing && (
          <div className="task-actions d-flex gap-2">
            {!showDeleteConfirm ? (
              <>
                {/* Edit button */}
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onStartEdit(task.id, task.nome)}
                  title="Modifica (o doppio click sul titolo)"
                  aria-label="Modifica task"
                >
                  ✏️
                </button>

                {/* Delete button */}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDeleteClick}
                  aria-label="Elimina task"
                >
                  🗑️
                </button>
              </>
            ) : (
              <>
                {/* Confirm delete */}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleConfirmDelete}
                >
                  ✓ Elimina
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  ✗ Annulla
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* ✨ Status indicator */}
      {task.completata && (
        <div className="card-footer text-center text-success">
          {`✅ Completato il ${new Date(task.dataModifica || task.dataCreazione).toLocaleDateString('it-IT')} alle ${new Date(task.dataModifica || task.dataCreazione).toLocaleTimeString('it-IT')}`}
        </div>
      )}
    </div>
  );
}