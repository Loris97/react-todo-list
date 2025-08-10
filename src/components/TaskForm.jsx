// Form per aggiungere un nuovo task
function TaskForm({ newTask, setNewTask, addTask }) {
  // Gestisce il submit del form
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita il refresh della pagina
    addTask(); // Chiama la funzione per aggiungere il task
  };

  return (
    <form className="d-flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Nuova attività"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)} // Aggiorna lo stato del nuovo task
      />
      <button type="submit" className="btn btn-primary">
        Aggiungi
      </button>
    </form>
  );
}

export default TaskForm;