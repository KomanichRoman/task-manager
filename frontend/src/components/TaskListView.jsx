import './TaskList.css';

function TaskListView({
  tasks,
  loading,
  error,
  createTask,
  updateStatus,
  deleteTask,
}) {
  const getStatusClass = (status) => {
    if (status === 'done') return 'status-done';
    if (status === 'in_progress') return 'status-progress';
    return 'status-new';
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="create-form">
        <h3>Создать новую задачу</h3>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const title = form.title.value.trim();
            const description = form.description.value.trim();

            if (!title) {
              alert('Введите название задачи');
              return;
            }

            const success = await createTask(title, description);
            if (success) {
              form.reset();
            }
          }}
        >
          <div className="form-group">
            <input
              name="title"
              placeholder="Название задачи"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              placeholder="Описание (необязательно)"
            />
          </div>
          <button type="submit" className="btn-submit">
            Добавить задачу
          </button>
        </form>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="tasks-section">
          <h3>Все задачи ({tasks.length})</h3>
          {tasks.length === 0 ? (
            <p>Задач пока нет. Создайте первую!</p>
          ) : (
            <table className="task-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Описание</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description || '—'}</td>
                    <td>
                      <select
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                        className={`status-select ${getStatusClass(task.status)}`}
                      >
                        <option value="new">🆕 Новая</option>
                        <option value="in_progress">⏳ В работе</option>
                        <option value="done">✅ Выполнена</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="btn-delete"
                      >
                        🗑️ Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskListView;