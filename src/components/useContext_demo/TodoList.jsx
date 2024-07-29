import React, { useContext } from 'react'
import { TodoContext } from './TodoContext'

const TodoList = () => {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext)
  console.log('todos:', todos)
  return (
    <>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.complete ? 'line-through' : null }}>{todo.todoContent}</span>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.complete ? 'Cancel' : 'Complete'}
          </button>
          <button onClick={() => { deleteTodo(todo.id) }}>Delete</button>
        </div>
      ))}
    </>
  )
}

export default TodoList
