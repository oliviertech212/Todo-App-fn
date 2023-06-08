
import React, { useState } from 'react';
import { ITodo } from '../type';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo) => void;
};

const AddTodo: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo>({
    _id: '',
    name: '',
    description: '',
    status: false,
  });
  const generateUniqueId = (): string => {
    return uuidv4();
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todoWithId: ITodo = { ...formData, _id: generateUniqueId() };
    saveTodo(e, todoWithId);
    setFormData({ _id: '', name: '', description: '', status: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>

<form onSubmit={handleFormSubmit} className="flex  bg-brightGray justify-between items-center px-3  py-4 mt-5 ">
      <div className='flex flex-col text-left'>
        <label htmlFor="name" className='text-white font-bold' >Name:</label>
        <input
        className='rounded border border-yellow'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='flex flex-col text-left w-2/4'>
        <label htmlFor="description"className='text-white font-bold' >Description:</label>
        <input
          className='rounded border border-yellow'
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className='rounded bg-yellow px-1 h-2/4 ' >Add Todo</button>
    </form>

    </div>
  
  );
};

export default AddTodo;

