import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import InputField from '@/app/components/Fields/InputField/InputField';
import Button from '@/app/components/Button/Button';
import { ListProps, TodoProps } from '@/app/types/types';

interface TodoFormProps {
	onSubmit: (data: ListProps) => void;
	initialData?: TodoProps;
}

const ListForm: React.FC<TodoFormProps> = ({ onSubmit, initialData }) => {
	const schema = zod.object({
		name: zod.string().min(1, { message: 'Required' }),
	});

	const methods = useForm<TodoProps>({
		defaultValues: initialData || {
			name: '',
		},
		resolver: zodResolver(schema),
	});

	const { register, handleSubmit } = methods;

	const handleFormSubmit = handleSubmit((data) => {
		onSubmit(data);
		methods.reset();
	});

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleFormSubmit}>
				<InputField
					{...register('name', { required: true })}
					placeholder='Add new list'
				/>
				<Button htmlType='submit'>Add List</Button>
			</form>
		</FormProvider>
	);
};

export default ListForm;
