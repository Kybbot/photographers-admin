import React, { ChangeEvent, FormEvent } from "react";

type EditAlbumFormProps = {
	data: {
		name: string;
		location: string;
		date: string;
	};
};

export const EditAlbumForm: React.FC<EditAlbumFormProps> = React.memo(({ data }: EditAlbumFormProps) => {
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

	React.useEffect(() => {
		setFormState(data);
	}, [data]);

	console.log("EditAlbumForm");

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
});

EditAlbumForm.displayName = "EditAlbumForm";
