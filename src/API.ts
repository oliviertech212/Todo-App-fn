

import axios,{AxiosResponse} from "axios";

import { ApiDataType } from "./type";
import { ITodo } from "./type";

const baseUrl:string="https://smiling-cow-bedclothes.cyclic.app";


export const getTodos= async():Promise<AxiosResponse<ApiDataType >>=>{
   
    try {

        const todos:AxiosResponse<ApiDataType>=await  axios.get(
            baseUrl+"/todos"
        )
       return todos;
        
    } catch (error:any) {
        throw new Error( error );
    }
}

export const addTodo = async (
    formData: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todo: Omit<ITodo, "_id"> = {
        name: formData.name,
        description: formData.description,
        status: false,
      }
      const saveTodo: AxiosResponse<ApiDataType> = await axios.post(
        baseUrl + "/add-todo",
        todo
      )
      return saveTodo
    } catch (error:any) {
      throw new Error(error)
    }
  }

  export const updateTodo = async (
    todo: ITodo
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const todoUpdate: Pick<ITodo, "status"> = {
        status: true,
      }
      const updatedTodo: AxiosResponse<ApiDataType> = await axios.put(
        `${baseUrl}/update/${todo._id}`,
        todoUpdate
      )
      return updatedTodo
    } catch (error:any) {
      throw new Error(error)
    }
  }

  export const deleteTodo = async (
    _id: string
  ): Promise<AxiosResponse<ApiDataType>> => {
    try {
      const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
        `${baseUrl}/delete/${_id}`
      )
      return deletedTodo
    } catch (error:any) {
      throw new Error(error)
    }
  }