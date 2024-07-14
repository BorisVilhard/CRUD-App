import { TodoDataProps, TodoProps } from '@/app/types/types';
import axios from 'axios';

const apiURL = 'https://6692cc7d346eeafcf46e38be.mockapi.io/api/v1/';

export const fetchTodos = async (listId: string): Promise<TodoProps[]> => {
	const response = await axios.get<TodoProps[]>(
		`${apiURL}lists/${listId}/todos`
	);
	return response.data;
};

export const addTodo = async (
	listId: string,
	todoData: TodoDataProps
): Promise<TodoProps> => {
	const response = await axios.post<TodoProps>(
		`${apiURL}lists/${listId}/todos`,
		todoData
	);
	return response.data;
};

export const updateTodo = async (
	listId: string,
	todoId: string,
	todoData: TodoDataProps
): Promise<TodoProps> => {
	const response = await axios.put<TodoProps>(
		`${apiURL}lists/${listId}/todos/${todoId}`,
		todoData
	);
	return response.data;
};

export const deleteTodo = async (
	listId: string,
	todoId: string
): Promise<void> => {
	await axios.delete(`${apiURL}lists/${listId}/todos/${todoId}`);
};

export const toggleTodoCompletion = async (
	listId: string,
	todoId: string,
	todoData: TodoDataProps
): Promise<TodoProps> => {
	const response = await axios.put<TodoProps>(
		`${apiURL}lists/${listId}/todos/${todoId}`,
		todoData
	);
	return response.data;
};
