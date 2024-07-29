import React from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import { TodoProvider } from './TodoContext'

const APP_UseContext = () => {
  return (
    <TodoProvider>
      <div>
        <h2>useContenxt + useReducer</h2>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default APP_UseContext
