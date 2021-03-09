import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  function handleCreateNewTask() {
    if(!newTaskTitle){
      setError('Preencha o título da tarefa')
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 999999),
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks(state => [...state, newTask])
      setNewTaskTitle('')
      setError('')
    }

  }

  function handleToggleTaskCompletion(id: number) {
    const newListTasks = tasks.map(t => {
      if(t.id === id){
        return{
          ...t,
          isComplete: !t.isComplete
        }

      }
      return t;
    });
    setTasks(newListTasks);
  }

  function handleRemoveTask(id: number) {
    const newListTasks = tasks.filter(t => t.id !== id);
    setTasks(newListTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>
      <div className="error">
        {!!error && <span>{error}</span>}

      </div>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}