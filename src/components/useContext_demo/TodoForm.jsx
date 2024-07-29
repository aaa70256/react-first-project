import React, { useState, useContext } from 'react'
import { TodoContext } from './TodoContext';

const TodoForm = () => {
  const { addTodo } = useContext(TodoContext)
  const [todoContent, setTodoContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todoContent);
  }
  return (<>
    <form onSubmit={handleSubmit}>
      <input
        value={todoContent}
        type="text"
        onChange={(e) => { setTodoContent(e.target.value) }} />
    </form>
  </>
  )
}

export default TodoForm
