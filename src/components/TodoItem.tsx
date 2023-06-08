

import React from "react"
import { ITodo,TodoProps } from "../type"
type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ""
  const additionalClass: string = "text-yellow font-bold";
  const additionalClassTodescription: string = "text-white font-bold";
  return (
    <div className="Card flex  bg-brightGray justify-between items-center px-3  py-4 mt-5">
      <div className="Card--text">
        <h1 className={`${checkTodo} ${additionalClass}`} >{todo.name}</h1>
        <span className={`${checkTodo} ${additionalClassTodescription}`}>{todo.description}</span>
      </div>
      <div className="Card--button">
        {todo.status===false  && <button
          onClick={() => updateTodo(todo)}
          className={todo.status ? `hide-button` : "Card--button__done rounded-full border-2 border-green-700  bg-white  px-3 h-2/4 mr-3"}
        >
          Complete
        </button>}
        
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete  rounded-full border-2 border-red  bg-white  px-3 h-2/4"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo