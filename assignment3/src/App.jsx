
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [recentTodos, setRecentTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [tab, setTab] = useState('recent'); 

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setRecentTodos([
        ...recentTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {

    if (tab === 'recent') {
      setRecentTodos(recentTodos.filter((todo) => todo.id !== id));
    }


    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit =
      tab === 'recent'
        ? recentTodos.find((todo) => todo.id === id)
        : completedTodos.find((todo) => todo.id === id);

    setEditingTodo(todoToEdit);
    setEditedText(todoToEdit.text);
  };

  const handleUpdateTodo = () => {
    if (editingTodo && editedText.trim() !== '') {
      const updatedTodo = { ...editingTodo, text: editedText };


      if (tab === 'recent') {
        setRecentTodos((prevRecentTodos) =>
          prevRecentTodos.map((todo) =>
            todo.id === editingTodo.id ? updatedTodo : todo
          )
        );
      }


      setCompletedTodos((prevCompletedTodos) =>
        prevCompletedTodos.map((todo) =>
          todo.id === editingTodo.id ? updatedTodo : todo
        )
      );

      setEditingTodo(null);
      setEditedText('');
    }
  };

  const handleDoneTodo = (id) => {
    const todoToMove = recentTodos.find((todo) => todo.id === id);


    setCompletedTodos([...completedTodos, { ...todoToMove, completed: true }]);


    setRecentTodos(recentTodos.filter((todo) => todo.id !== id));
  };

  const getFilteredTodos = () => {
    return tab === 'recent' ? recentTodos : completedTodos;
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <button onClick={() => setTab('recent')}>Recent Todos</button>
        <button onClick={() => setTab('completed')}>Completed Todos</button>
      </div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <TodoList
        todos={getFilteredTodos()}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
        onUpdate={handleUpdateTodo}
        onDone={handleDoneTodo}
        editingTodo={editingTodo}
        editedText={editedText}
        setEditedText={setEditedText}
      />
    </div>
  );
}

export default App;
