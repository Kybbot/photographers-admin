import React, { ChangeEvent, FormEvent } from "react";

import { InfoMessage } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { usePhotos } from "../../../stores/usePhotos";

import { PhotoType } from "../../../@types/api";

type EditPhotoFormProps = {
	data: PhotoType;
};

export const EditPhotoForm: React.FC<EditPhotoFormProps> = React.memo(({ data }: EditPhotoFormProps) => {
	const { loading, error, request } = useAuthFetch();

	const [updatePhoto, deletePhoto] = usePhotos((state) => [state.updatePhoto, state.deletePhoto]);

	const [formState, setFormState] = React.useState({ photo_name: data.photo_name });

	const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const deleteBtnHandler = async () => {
		const result = await request(`/photo/${data.photo_id}`, "DELETE");

		if (result) {
			deletePhoto(data.photo_id);
		}
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const body = JSON.stringify({
			photo_id: data.photo_id,
			photo_name: formState.photo_name,
		});

		const result = await request<PhotoType>("/photo", "PUT", body);

		if (result && Object.keys(result).length > 0) {
			updatePhoto(result);
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
					name="photo_name"
					value={formState.photo_name}
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

EditPhotoForm.displayName = "EditPhotoForm";
