import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { render } from '@testing-library/react';
import Axios from 'axios'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const todoNameRef = useRef()
  const [todos, setTodos] = useState([])

  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  //   console.log(storedTodos); 
  //   if(storedTodos) setTodos(storedTodos)
  // }, [])

  // useEffect(() => {
  //   console.log(todos);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  // }, [todos])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response.data);
      setTodos(response.data);
    });
  }, []);

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {

    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete:false}]
    })
    todoNameRef.current.value = null

    //db call
    Axios.post("http://localhost:3001/api/insert", {
      todoname: name
    }).then(() => {
      alert("successful insert");
    });
  }

  function handleClearCompletedTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleClearTodoById(id) {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  function handleClearTodos() {
    const newTodos = []
    setTodos(newTodos)
  }

  function toggleTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
  }

  return (
    <>
      <div>
        <button className="darkModeButton" onClick={toggleTheme}>Dark Mode</button>
      </div>
      <div className="mainContent">
        <h1>New Todo</h1>
      <div className="addTodo">
        <input className="todoInput" ref={todoNameRef} type="text" placeholder='New Todo'/>
        <button className="addTodoButton" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <div className="todoList">
        <h2>Todo List</h2>
        <TodoList todos={todos} toggleTodo={toggleTodo} clearTodo={handleClearTodoById}/>
      </div>
      <div className="clearTodo">
        <button className="clearTodoButton" onClick={handleClearCompletedTodos}>Clear Completed Todos</button>
        <button className="clearTodoButton" onClick={handleClearTodos}>Clear all Todos</button>
      </div>
      <div>You got {todos.filter(todo => !todo.complete).length} uncompleted Todo(s) left!</div>
    </div>
    </>
  )
}

export default App;