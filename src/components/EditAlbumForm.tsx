import React, { ChangeEvent, FormEvent } from "react";

import { EditAlbumFormProps } from "../@types/albums";

export const EditAlbumForm: React.FC<EditAlbumFormProps> = ({ data }) => {
	console.log(data);

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
			<label htmlFor="date" className="form__label">
				Date
				<input
					className="form__input"
					type="date"
					id="date"
					name="date"
					value={formState.date}
					onChange={inputHandler}
				/>
			</label>
			<button type="submit" className="btn">
				Save
			</button>
		</form>
	);
};
