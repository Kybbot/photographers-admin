import React, { ChangeEvent, FormEvent } from "react";

import { PhotoType } from "../../../@types/api";

type EditPhotoFormProps = {
	data: PhotoType;
};

export const EditPhotoForm: React.FC<EditPhotoFormProps> = ({ data }) => {
	const [formState, setFormState] = React.useState(data);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const fromHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(formState);
	};

	return (
		<form className="form" onSubmit={fromHandler}>
			<label htmlFor="name" className="form__label">
				Name
				<input
					className="form__input"
					type="text"
					id="name"
					name="name"
					value={formState.photo_name}
					onChange={inputHandler}
				/>
			</label>
			<fieldset className="form__btns">
				<button type="submit" className="btn">
					Update
				</button>
				<button type="button" className="btn btn--delete">
					Delete
				</button>
			</fieldset>
		</form>
	);
};
