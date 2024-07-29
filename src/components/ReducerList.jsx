import React from 'react'
import '../style/all.scss'

const ReducerList = ({ todo, dispatch }) => {
  return (
    <div className='ReducerList'>
      <span style={{ textDecoration: todo.complete ? 'line-through' : null }}>{todo.todoContent}</span>
      <button className='complete_btn' onClick={() => {
        dispatch({ type: 'toggle', payload: { id: todo.id } })
      }}>
        {todo.complete ? 'Cancel' : 'Complete'}
      </button>
      <button className='delete_btn' onClick={() => {
        dispatch({ type: 'delete', payload: { id: todo.id } })
      }}>Delete</button>
    </div>
  )
}

export default ReducerList
