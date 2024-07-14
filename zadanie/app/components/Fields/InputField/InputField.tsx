'use client';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import FieldWrapper from '../FieldWrapper/FieldWrapper';

interface Props<T extends FieldValues> {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	defaultValue?: string;
}

const InputField = <T extends FieldValues>(props: Props<T>) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<FieldWrapper
			label={props.label}
			error={errors[props.name]?.message as string}
		>
			<input
				className={`h-[4vh] min-h-[45px] w-full border-none px-[15px] opacity-100`}
				type={'text'}
				placeholder={props.placeholder}
				defaultValue={props.defaultValue}
				{...register(props.name)}
			/>
		</FieldWrapper>
	);
};

export default InputField;
