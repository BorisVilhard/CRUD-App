import React, { useEffect, useState } from 'react';
import { TodoProps } from '@/app/types/types';

interface Props {
	data: TodoProps[];
	getFilteredData: (data: TodoProps[]) => void;
}

const FilterTodoBar: React.FC<Props> = ({ data, getFilteredData }) => {
	const [dateFilter, setDateFilter] = useState<string>('');
	const [priorityFilter, setPriorityFilter] = useState<
		'high' | 'medium' | 'low' | ''
	>('');

	useEffect(() => {
		const filteredData = data.filter((item) => {
			const itemDate = new Date(item.createdAt).toDateString();
			const filterDate = dateFilter ? new Date(dateFilter).toDateString() : '';
			return (
				(!dateFilter || itemDate === filterDate) &&
				(!priorityFilter || item.priority === priorityFilter)
			);
		});
		getFilteredData(filteredData);
	}, [dateFilter, priorityFilter, data]);

	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDateFilter(event.target.value);
	};

	const handlePriorityChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setPriorityFilter(event.target.value as 'high' | 'medium' | 'low' | '');
	};

	return (
		<div className='flex items-center'>
			<label className='font-bold mr-[10px] text-[18px]'>Filter:</label>
			<input type='date' value={dateFilter} onChange={handleDateChange} />
			<select value={priorityFilter} onChange={handlePriorityChange}>
				<option value=''>All Priorities</option>
				<option value='high'>High</option>
				<option value='medium'>Medium</option>
				<option value='low'>Low</option>
			</select>
		</div>
	);
};

export default FilterTodoBar;
