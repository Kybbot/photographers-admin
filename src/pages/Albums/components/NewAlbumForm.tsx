import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import { InfoMessage } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useAlbums } from "../../../stores/useAlbums";

import { AlbumType } from "../../../@types/api";

type NewAlbumFormProps = {
	closeModal: () => void;
};

export const NewAlbumForm: FC<NewAlbumFormProps> = React.memo(({ closeModal }: NewAlbumFormProps) => {
	const { loading, error, request } = useAuthFetch();

	const addNewAlbum = useAlbums((state) => state.addNewAlbum);

	const initialState = {
		album_name: "",
		album_location: "",
		date: "",
	};

	const [formState, setFormState] = useState(initialState);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const date = new Date(formState.date).valueOf();

		const body = JSON.stringify({
			album_name: formState.album_name,
			album_location: formState.album_location,
			date,
		});

		const result = await request<[AlbumType]>("/album", "POST", body);

		if (result?.success) {
			addNewAlbum(result.data[0]);
			setFormState(initialState);
			closeModal();
		}
	};

	return (
		<form className="form" onSubmit={fromHandler}>
			<label htmlFor="newName" className="form__label">
				Name
				<input
					className="form__input"
					type="text"
					id="newName"
					name="album_name"
					required
					value={formState.album_name}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="newLocation" className="form__label">
				Location
				<input
					className="form__input"
					type="text"
					id="newLocation"
					name="album_location"
					required
					value={formState.album_location}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="newDate" className="form__label">
				Date
				<input
					className="form__input"
					type="date"
					id="newDate"
					name="date"
					required
					value={formState.date}
					onChange={inputHandler}
				/>
			</label>
			<button type="submit" className="btn" disabled={loading || !!error}>
				Save
			</button>
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
});

NewAlbumForm.displayName = "NewAlbumForm";
