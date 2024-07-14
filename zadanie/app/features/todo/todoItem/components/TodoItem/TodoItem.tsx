import Button from '@/app/components/Button/Button';
import { TodoProps } from '@/app/types/types';
import React from 'react';
import EditableInputForm from '../../../components/editableInput/EditableInput';

interface TodoItemProps {
	todo: TodoProps;
	handleTodoEdit: (id: string, name: string) => void;
	handleToggleComplete: (id: string) => void;
	handleTodoDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
	todo,
	handleTodoEdit,
	handleToggleComplete,
	handleTodoDelete,
}) => {
	return (
		<div
			key={todo.id}
			className='flex items-center justify-between gap-3 border-b-2 border-solid p-2 border-b-slate-300 last:border-b-0'
		>
			<div className='flex lg:w-[300px] items-center'>
				<EditableInputForm
					data={todo}
					onSubmit={(e) => handleTodoEdit(todo.id, e)}
				/>
			</div>
			<div className='flex items-center gap-[50px]'>
				<div className='flex-col md:flex-row lg:flex-row gap-[5px]'>
					<div>{new Date(todo.createdAt).toDateString()}</div>
					<div>{todo.priority}</div>
				</div>

				<div className='flex-col md:flex-row lg:flex-row gap-[5px]'>
					<Button type='delete' onClick={() => handleTodoDelete(todo.id)}>
						Delete
					</Button>
					<Button
						type={todo.completed ? 'completed' : 'ongoing'}
						onClick={() => handleToggleComplete(todo.id)}
					>
						{todo.completed ? 'Completed' : 'Ongoing'}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TodoItem;
