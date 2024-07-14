import { ListDataProps, ListProps } from '@/app/types/types';
import axios from 'axios';

const apiURL = 'https://6692cc7d346eeafcf46e38be.mockapi.io/api/v1/';

export const fetchLists = async (): Promise<ListProps[]> => {
	const response = await axios.get<ListProps[]>(`${apiURL}lists`);
	return response.data;
};

export const addList = async (listData: ListDataProps): Promise<ListProps> => {
	const response = await axios.post<ListProps>(`${apiURL}lists`, listData);
	return response.data;
};

export const updateList = async (
	listId: string,
	listData: ListDataProps
): Promise<ListProps> => {
	const response = await axios.put<ListProps>(
		`${apiURL}lists/${listId}`,
		listData
	);
	return response.data;
};

export const deleteList = async (listId: string): Promise<void> => {
	await axios.delete(`${apiURL}lists/${listId}`);
};
