import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo, clearTodo}) {
    return (
        todos.map(todo => {
            return <Todo key={todo.id} toggleTodo={toggleTodo} clearTodo={clearTodo} todo={todo}/>
        })
    )
}
