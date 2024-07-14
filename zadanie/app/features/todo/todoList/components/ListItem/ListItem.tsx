import Button from '@/app/components/Button/Button';
import { ListProps } from '@/app/types/types';
import React from 'react';
import EditableInputForm from '../../../components/editableInput/EditableInput';

interface ListItemProps {
	list: ListProps;
	selectedListId: string | null;
	handleListEdit: (id: string, name: string) => void;
	handleListDelete: (id: string) => void;
	handleListChange: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
	list,
	selectedListId,
	handleListEdit,
	handleListDelete,
	handleListChange,
}) => {
	return (
		<div
			key={list.id}
			className='flex items-center justify-between gap-3 border-b-2 border-solid p-2 border-b-slate-300 last:border-b-0'
		>
			<EditableInputForm
				data={list}
				isSelectedList={selectedListId === list.id}
				handleListChange={handleListChange}
				onSubmit={(e) => handleListEdit(list.id, e)}
			/>

			<Button type='delete' onClick={() => handleListDelete(list.id)}>
				Delete
			</Button>
		</div>
	);
};

export default ListItem;
