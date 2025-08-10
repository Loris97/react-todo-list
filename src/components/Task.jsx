import React from 'react';

// Card singola per ogni task
function Task({ nome, completata, onDelete, onToggle }) {
  return (
    <div className={`card mb-3 ${completata ? "border-success" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        {/* Nome del task, barrato se completato */}
        <span className={completata ? "text-decoration-line-through" : ""}>
          {nome}
        </span>
        <div>
          {/* Bottone per completare/annullare il task */}
          {!completata && (
            <button
              className="btn btn-outline-success btn-sm me-2"
              onClick={onToggle}
            >
              Completa
            </button>
          )}
          {completata && (
            <button
              className="btn btn-outline-warning btn-sm me-2"
              onClick={onToggle}
            >
              Annulla
            </button>
          )}
          {/* Bottone per eliminare il task */}
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={onDelete}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default Task;