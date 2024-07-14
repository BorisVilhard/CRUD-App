'use client';
import React, { useEffect, useState } from 'react';
import {
	addTodo,
	deleteTodo,
	fetchTodos,
	toggleTodoCompletion,
	updateTodo,
} from './todoItem/api/todo-api';
import { ListProps, TodoDataProps, TodoProps } from '@/app/types/types';
import TodoItem from './todoItem/components/TodoItem/TodoItem';
import TodoForm from './todoItem/components/TodoForm/TodoForm';
import ListItem from './todoList/components/ListItem/ListItem';
import ListForm from './todoList/components/ListForm/ListForm';
import FilterTodoBar from './todoList/components/FilterListBar/FilterTodoBar';
import { addList, deleteList, fetchLists, updateList } from './todoList/api/todoList-api';

const TodoList: React.FC = () => {
	const [lists, setLists] = useState<ListProps[]>([]);
	const [todos, setTodos] = useState<TodoProps[]>([]);
	const [filteredTodos, setFilteredTodos] = useState<TodoProps[]>([]);

	const [selectedListId, setSelectedListId] = useState<string | null>(null);

	const selectedListName = lists.find(
		(list) => list.id === selectedListId
	)?.name;

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				const listResponse = await fetchLists();
				setLists(listResponse);
				if (listResponse.length > 0) {
					setSelectedListId(listResponse[0].id);
				}
			} catch (error) {
				console.error('Error fetching initial data', error);
			}
		};
		loadInitialData();
	}, []);

	useEffect(() => {
		const fetchTodosForList = async () => {
			if (selectedListId) {
				try {
					const todosResponse = await fetchTodos(selectedListId);
					setTodos(todosResponse || []);
				} catch (error) {
					console.error('Error fetching todos', error);
					setTodos([]);
				}
			} else {
				setTodos([]);
			}
		};
		fetchTodosForList();
	}, [selectedListId]);

	const handleListChange = async (listId: string) => {
		setSelectedListId(listId);
		try {
			const res = await fetchTodos(listId);
			setTodos(res);
		} catch (error) {
			console.error('Error changing list', error);
		}
	};

	const handleListSubmit = async (listData: ListProps) => {
		try {
			const newList = await addList(listData);
			setLists((prevLists) => [...prevLists, newList]);
			setSelectedListId(newList.id);
			setTodos([]);
		} catch (error) {
			console.error('Error adding list', error);
		}
	};

	const handleListEdit = async (id: string, newName: string) => {
		try {
			const updatedList = await updateList(id, { name: newName });
			setLists(lists.map((list) => (list.id === id ? updatedList : list)));
		} catch (error) {
			console.error('Error updating list', error);
		}
	};

	const handleListDelete = async (id: string) => {
		try {
			await deleteList(id);
			setLists((lists) => lists.filter((list) => list.id !== id));
			if (id === selectedListId) {
				setSelectedListId(null);
				setTodos([]);
			}
		} catch (error) {
			console.error('Error deleting list', error);
		}
	};

	const handleTodoSubmit = async (todoData: TodoProps) => {
		if (selectedListId) {
			try {
				const newTodo = await addTodo(selectedListId, todoData);
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			} catch (error) {
				console.error('Error adding todo', error);
			}
		} else {
			alert('Please select a list first!');
		}
	};

	const handleTodoEdit = async (todoId: string, newName: string) => {
		if (!selectedListId) return;

		const currentTodo = todos.find((todo) => todo.id === todoId);
		if (!currentTodo) {
			console.error('Todo not found');
			return;
		}

		const updatedData: TodoDataProps = {
			name: newName,
			completed: currentTodo.completed,
		};

		try {
			const updatedTodo = await updateTodo(selectedListId, todoId, updatedData);
			setTodos((todos) =>
				todos.map((todo) => (todo.id === todoId ? updatedTodo : todo))
			);
		} catch (error) {
			console.error('Error updating todo', error);
		}
	};

	const handleTodoDelete = async (todoId: string) => {
		if (!selectedListId) return;
		try {
			await deleteTodo(selectedListId, todoId);
			setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
		} catch (error) {
			console.error('Error deleting todo', error);
		}
	};

	const handleToggleComplete = async (todoId: string) => {
		if (!selectedListId) return;
		const todo = todos.find((t) => t.id === todoId);
		if (!todo) return;
		try {
			const updatedTodo = await toggleTodoCompletion(selectedListId, todoId, {
				...todo,
				completed: !todo.completed,
			});
			setTodos((todos) =>
				todos.map((t) => (t.id === todoId ? updatedTodo : t))
			);
		} catch (error) {
			console.error('Error toggling todo completion', error);
		}
	};

	const NoDataLabel = () => (
		<div className='text-4xl text-neutral font-bold'>No data</div>
	);

	return (
		<div className='flex w-full min-h-[70vh] flex-col lg:flex-row rounded-md border-slate-300 border-2 gap-[30px] border-solid p-[30px]'>
			<div className='w-full lg:min-w-[30vw]'>
				<h3>Lists</h3>
				<ListForm onSubmit={handleListSubmit} />
				{lists.length > 0 ? (
					<div>
						{lists.map((list) => (
							<ListItem
								key={list.id}
								selectedListId={selectedListId}
								list={list}
								handleListChange={handleListChange}
								handleListDelete={handleListDelete}
								handleListEdit={handleListEdit}
							/>
						))}
					</div>
				) : (
					<div className='flex justify-center'>{NoDataLabel()}</div>
				)}
			</div>
			{selectedListId && (
				<>
					<div className='w-full lg:min-w-[50vw]'>
						<h3>Todos in {selectedListName}</h3>
						<TodoForm onSubmit={handleTodoSubmit} />
						<FilterTodoBar data={todos} getFilteredData={setFilteredTodos} />
						{filteredTodos.length > 0 ? (
							<div>
								{filteredTodos.map((todo, index) => (
									<TodoItem
										key={index}
										todo={todo}
										handleTodoEdit={handleTodoEdit}
										handleToggleComplete={handleToggleComplete}
										handleTodoDelete={handleTodoDelete}
									/>
								))}
							</div>
						) : (
							<div className='flex justify-center'>{NoDataLabel()}</div>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default TodoList;
