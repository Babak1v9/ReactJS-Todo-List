import React from 'react'

export default function Todo({todo, toggleTodo, clearTodo}) {

    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function clearTodoById() {
        clearTodo(todo.id);
    }

    return (
        <div className="todoDiv">
            <label>
                {/*<input className="editIcon" type="image" src="https://findicons.com/files/icons/99/office/256/edit.png" alt="edit"></input> */}
                <input className="trashIcon" type="image" onClick={clearTodoById} src="https://findicons.com/files/icons/1580/devine_icons_part_2/256/trash_recyclebin_empty_closed.png" alt="bin"></input>
                <input className="checkbox" type="checkbox" checked={todo.complete} onChange={handleTodoClick}></input>
                {todo.name}
            </label>    
        </div>
    )
}
