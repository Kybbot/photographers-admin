import React, { ChangeEvent, FormEvent } from "react";

import { InfoMessage } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useAlbums } from "../../../stores/useAlbums";

import { AlbumType } from "../../../@types/api";

type EditAlbumFormProps = {
	data: AlbumType;
};

export const EditAlbumForm: React.FC<EditAlbumFormProps> = React.memo(({ data }: EditAlbumFormProps) => {
	const { loading, error, request } = useAuthFetch();

	const [updateAlbum, removeAlbum] = useAlbums((state) => [state.updateAlbum, state.removeAlbum]);

	const [formState, setFormState] = React.useState(data);

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const deleteBtnHandler = async () => {
		const result = await request<"ok">(`https://splastun2.node.shpp.me/api/album/${data.album_id}`, "DELETE");

		if (result) {
			removeAlbum(data.album_id);
		}
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const date = new Date(formState.date).valueOf();

		const body = JSON.stringify({
			album_id: formState.album_id,
			album_name: formState.album_name,
			album_location: formState.album_location,
			date,
		});

		const result = await request<AlbumType>("https://splastun2.node.shpp.me/api/album", "PUT", body);

		if (result && Object.keys(result).length > 0) {
			updateAlbum(result);
		}
	};

	React.useEffect(() => {
		setFormState(data);
	}, [data]);

	return (
		<form className="form" onSubmit={fromHandler}>
			<label htmlFor="name" className="form__label">
				Name
				<input
					className="form__input"
					type="text"
					id="name"
					name="album_name"
					value={formState.album_name}
					onChange={inputHandler}
				/>
			</label>
			<label htmlFor="location" className="form__label">
				Location
				<input
					className="form__input"
					type="text"
					id="location"
					name="album_location"
					value={formState.album_location}
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
				<button type="button" className="btn btn--delete" onClick={deleteBtnHandler}>
					Delete
				</button>
			</fieldset>
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
});

EditAlbumForm.displayName = "EditAlbumForm";
