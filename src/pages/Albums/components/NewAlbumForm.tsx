import React, { ChangeEvent, FormEvent } from "react";

import { InfoMessage } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useAlbums } from "../../../stores/useAlbums";

import { AlbumType } from "../../../@types/api";

export const NewAlbumForm: React.FC = React.memo(() => {
	const { loading, error, request } = useAuthFetch();

	const addNewAlbumZus = useAlbums((state) => state.addNewAlbum);

	const initialState = {
		album_name: "",
		album_location: "",
		date: "",
	};

	const [formState, setFormState] = React.useState(initialState);

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

		const data = await request<[AlbumType]>("https://splastun2.node.shpp.me/api/album", "POST", body);

		if (data) {
			addNewAlbumZus(data[0]);
		}

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
			<button type="submit" className="btn">
				Save
			</button>
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
});

NewAlbumForm.displayName = "NewAlbumForm";
