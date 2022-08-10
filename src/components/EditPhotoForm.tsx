import React, { ChangeEvent, FormEvent } from "react";

import { EditPhotoFormProps } from "../@types/albums";

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
					value={formState.name}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="location" className="form__label">
				Location
				<input
					className="form__input"
					type="text"
					id="location"
					name="location"
					value={formState.location}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="people" className="form__label">
				People
				<input
					className="form__input"
					type="text"
					id="people"
					name="people"
					value={formState.people}
					onChange={inputHandler}
				/>
			</label>
			<button type="submit" className="btn">
				Save
			</button>
		</form>
	);
};
