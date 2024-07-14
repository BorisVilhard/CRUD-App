import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import InputField from '@/app/components/Fields/InputField/InputField';
import Button from '@/app/components/Button/Button';
import { MdOutlineEdit } from 'react-icons/md';

interface EditableInputProps {
	onSubmit: (data: string) => void;
	handleListChange?: (id: string) => void;
	isSelectedList?: boolean;
	data: { id: string; name: string };
}

const EditableInputForm = ({
	onSubmit,
	handleListChange,
	isSelectedList,
	data,
}: EditableInputProps) => {
	const [isEditing, setEditing] = useState<boolean>();

	const schema = zod.object({
		name: zod.string().min(1, { message: 'Required' }),
	});

	const methods = useForm({
		defaultValues: {
			name: '' || data.name,
		},
		resolver: zodResolver(schema),
	});

	const { register, handleSubmit, reset } = methods;

	const handleFormSubmit = handleSubmit((formData) => {
		onSubmit(formData.name);
		setEditing(false);
		reset();
	});

	return (
		<>
			{isEditing ? (
				<div className='relative flex'>
					<FormProvider {...methods}>
						<form
							onSubmit={handleFormSubmit}
							className='flex gap-[10px] items-center'
						>
							<InputField
								{...register('name')}
								placeholder='Add new list'
								defaultValue={data.name}
							/>
							<Button htmlType='submit'>submit</Button>
							<Button onClick={() => setEditing(false)}>Back</Button>
						</form>
					</FormProvider>
				</div>
			) : (
				<div
					onClick={
						handleListChange ? () => handleListChange(data.id) : () => {}
					}
					style={{
						fontWeight: isSelectedList ? 'bold' : 'normal',
					}}
					className='flex h-[20px] w-full cursor-pointer justify-between items-center'
				>
					{data.name}
					<span
						onClick={() => setEditing(true)}
						className='bg-default cursor-pointer p-[3%] rounded-full'
					>
						<MdOutlineEdit color='white' />
					</span>
				</div>
			)}
		</>
	);
};

export default EditableInputForm;
