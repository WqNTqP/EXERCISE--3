
import React from 'react';

const TodoList = ({
  todos,
  onDelete,
  onEdit,
  onUpdate,
  onDone,
  editingTodo,
  editedText,
  setEditedText,
}) => {
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </span>
          {!todo.completed && (
            <>
              <button onClick={() => onEdit(todo.id)}>Edit</button>
              <button onClick={() => onDelete(todo.id)}>Delete</button>
              <button onClick={() => onDone(todo.id)}>Done</button>
            </>
          )}
        </div>
      ))}
      {editingTodo && (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={onUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
