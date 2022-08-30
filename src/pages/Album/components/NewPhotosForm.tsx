import React, { ChangeEvent, FormEvent } from "react";

import { InfoMessage } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";

import { PhotoType } from "../../../@types/api";

type NewPhotosFormProps = {
	albumId: number;
	addNewPhoto: (newData: PhotoType[]) => void;
};

export const NewPhotosForm: React.FC<NewPhotosFormProps> = ({ albumId, addNewPhoto }) => {
	const { loading, error, request } = useAuthFetch();

	const [files, setFiles] = React.useState<File[]>([]);

	const filesHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files);

			setFiles((prev) => [...prev, ...files]);
		}
	};

	const removeFile = (name: string) => {
		setFiles((prev) => Array.from(prev).filter((item) => item.name !== name));
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("album_id", String(albumId));
		formData.append("Content-Type", "multipart/form-data");
		for (let i = 0; i < files.length; i++) {
			formData.append("file", files[i]);
		}

		const data = await request("https://splastun2.node.shpp.me/api/photos", "POST", formData, {}, true);

		console.log(data);

		// addNewPhoto(data);
		// setFiles([]);
	};

	return (
		<form className="form" onSubmit={fromHandler} encType="multipart/form-data">
			<div className="form__files">
				<input id="newPhotos" type="file" name="file" accept=".png,.jpg,.jpeg,.webp" multiple onChange={filesHandler} />
				<label htmlFor="newPhotos" className="btn">
					Choose Photos
				</label>
			</div>
			<div className="form__photos">
				{files && files.length > 0
					? Array.from(files).map((file, index) => (
							<div className="form__wrapper" key={index}>
								<img className="form__photo" src={URL.createObjectURL(file)} alt={file.name} />
								<button className="form__remove btn" type="button" onClick={() => removeFile(file.name)}>
									Remove
								</button>
							</div>
					  ))
					: "No Photos"}
			</div>
			<button type="submit" className="btn">
				{files.length > 10 ? "Too many files" : "Upload Photos"}
			</button>
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
};
