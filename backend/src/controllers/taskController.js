const pool = require('../config/db');

const getAllTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Название задачи обязательно' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description || null, 'new']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при создании задачи:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

module.exports = {
  getAllTasks,
  createTask
};