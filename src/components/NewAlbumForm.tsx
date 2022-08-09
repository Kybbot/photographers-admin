import React, { ChangeEvent, FormEvent } from "react";

export const NewAlbumForm = () => {
	const initialState = {
		newName: "",
		newLocation: "",
		newDate: "",
	};

	const [formState, setFormState] = React.useState(initialState);

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
		setFormState(initialState);
	};

	return (
		<form className="form" onSubmit={fromHandler}>
			<label htmlFor="newName" className="form__label">
				Name
				<input
					className="form__input"
					type="text"
					id="newName"
					name="newName"
					value={formState.newName}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="newLocation" className="form__label">
				Location
				<input
					className="form__input"
					type="text"
					id="newLocation"
					name="newLocation"
					value={formState.newLocation}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="newDate" className="form__label">
				Date
				<input
					className="form__input"
					type="date"
					id="newDate"
					name="newDate"
					value={formState.newDate}
					onChange={inputHandler}
				/>
			</label>
			<button type="submit" className="btn">
				Save
			</button>
		</form>
	);
};
