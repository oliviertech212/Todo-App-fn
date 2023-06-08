
import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'
import { ITodo } from './type'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => 
    setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo,): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved")
        }
        setTodos(data.todos)
      }).then(()=>{
        fetchTodos()
      })
      .catch(err => console.log(err))
  }

 
  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not updated")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }
  
  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log("here is error ",err))
  }
  return (
    <main className=' text-center flex justify-center items-center bg-white h-screen'>
      <div className='text-center bg-black h-3/4 w-11/12 py-10 rounded px-5'>

      <h1 className="text-3xl font-bold underline text-white text-center">My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos&&todos.map((todo: ITodo, index:number) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}

      </div>
      
    </main>
  )
}



  export default App;