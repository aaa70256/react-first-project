import { useState, useReducer } from "react"
import ReducerList from "./ReducerList"

const reducer = (todos, action) => {
  console.log(todos, action)
  const { value } = action.payload
  switch (action.type) {
    case "ADD":
      return [...todos, newTodo(value)];
    case "toggle":
      return todos.map(item => {
        if (item.id === action.payload.id) {
          return { ...item, complete: !item.complete }
        }
        return item
      })
    case 'delete':
      return todos.filter(item => {
        return item.id !== action.payload.id
      })
    default:
      return todos;
  }
}

const newTodo = (todoContent) => {
  return { id: Math.floor(Math.random() * 100000), todoContent, complete: false }
}

const CP_UseReducer = () => {
  const [value, setValue] = useState('')
  const [todos, dispatch] = useReducer(reducer, [])
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD', payload: { value: value } })
  }
  return (
    <div>
      <h2>useReducer</h2>
      <form onSubmit={submitHandler}>
        <input
          value={value}
          type="text"
          onChange={(e) => { setValue(e.target.value) }} />
      </form>
      {
        todos.map(item => {
          return <ReducerList todo={item} dispatch={dispatch} key={item.id} />
        })
      }
    </div>
  )
}

export default CP_UseReducer
