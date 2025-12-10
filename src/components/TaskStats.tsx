// src/components/TaskStats.tsx
import { useMemo } from 'react';  
import { Task, TaskStats as TaskStatsType } from '../types/task';
import './TaskStats.css';

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = useMemo<TaskStatsType>(() => {
    const completati = tasks.filter((t) => t.completata).length;
    const attivi = tasks.length - completati;

    const perCategoria: Record<string, number> = {};
    tasks.forEach((task) => {
      if (task.categoria) {
        perCategoria[task.categoria] =
          (perCategoria[task.categoria] || 0) + 1;
      }
    });

    return {
      totali: tasks.length,
      completati,
      attivi,
      perCategoria,
    };
  }, [tasks]);

  return (
    <div className="task-stats">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{stats.totali}</span>
          <span className="stat-label">Totali</span>
        </div>
        <div className="stat-card active">
          <span className="stat-number">{stats.attivi}</span>
          <span className="stat-label">Attivi</span>
        </div>
        <div className="stat-card completed">
          <span className="stat-number">{stats.completati}</span>
          <span className="stat-label">Completati</span>
        </div>

        {Object.keys(stats.perCategoria).length > 0 && (
          <div className="stat-card categories">
            <span className="stat-label">Per categoria:</span>
            <div className="categories-list">
              {Object.entries(stats.perCategoria).map(([cat, count]) => (
                <span key={cat} className="category-badge">
                  {cat}: {count}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {stats.totali === 0 && (
        <div className="empty-state">
          <p>Nessun task. Inizia creandone uno! 🚀</p>
        </div>
      )}
    </div>
  );
}

export default TaskStats;
