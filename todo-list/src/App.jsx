import React, { useState, useEffect } from 'react';
import TodoRow from './components/TodoRow';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: generateId(), label: newTodo }]);
      setNewTodo('');
    } else {
      alert('Please add some tasks.');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.removeItem(id);  // Remove the item's checked state from local storage
  };

  const handleEditTodo = (id, newLabel) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, label: newLabel } : todo));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        className="add-todo"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={handleKeyPress}
        placeholder="Add new todo"
      />
      <button className="bigbtn" onClick={handleAddTodo}>Add</button>
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoRow
            key={todo.id}
            id={todo.id}
            label={todo.label}
            onDelete={() => handleDeleteTodo(todo.id)}
            onEdit={(newLabel) => handleEditTodo(todo.id, newLabel)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
