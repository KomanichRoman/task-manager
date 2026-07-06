// TaskList.jsx — ТОЛЬКО ЛОГИКА
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskListView from './TaskListView';

const API_URL = 'http://localhost:5000/tasks';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const sortedTasks = [...response.data].sort((a, b) => a.id - b.id);
      setTasks(sortedTasks);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке задач');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title, description) => {
    try {
      const response = await axios.post(API_URL, {
        title,
        description,
      });
      setTasks([...tasks, response.data]);
      return true;
    } catch (err) {
      console.error('Ошибка при создании задачи:', err);
      alert('Не удалось создать задачу');
      return false;
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        status: newStatus,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
      alert('Не удалось обновить статус');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить задачу?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении задачи:', err);
      alert('Не удалось удалить задачу');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskListView
      tasks={tasks}
      loading={loading}
      error={error}
      createTask={createTask}
      updateStatus={updateStatus}
      deleteTask={deleteTask}
    />
  );
}

export default TaskList;