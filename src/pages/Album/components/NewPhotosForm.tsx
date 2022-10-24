import React, { ChangeEvent, FormEvent, useState } from "react";

import { InfoMessage, Select } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useAlbums } from "../../../stores/useAlbums";
// import { usePhotos } from "../../../stores/usePhotos";

import { ClientsType } from "../../../@types/api";

type NewPhotosFormProps = {
	albumId: number;
};

type mapObject = {
	file: File;
	clients: ClientsType[];
};

export const NewPhotosForm: React.FC<NewPhotosFormProps> = React.memo(({ albumId }: NewPhotosFormProps) => {
	const { loading, error, success, request } = useAuthFetch();

	const [clients] = useAlbums((state) => [state.clients]);

	// const addNewPhoto = usePhotos((state) => state.addNewPhoto);

	const map = new Map<string, mapObject>();
	const [testFiles, setTestFiles] = useState<[string, mapObject][]>(Array.from(map));

	const filesHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			Array.from(event.target.files).map((item) => map.set(item.name, { file: item, clients: [clients[0]] }));
			setTestFiles(Array.from(map));
		}
	};

	const removeFileHandler = (name: string) => {
		setTestFiles((prev) => {
			const arr = prev;

			for (let i = 0; i < prev.length; i++) {
				if (arr[i][0] === name) {
					arr.splice(i, 1);
				}
			}

			return [...arr];
		});
	};

	const selectClientsHandler = (client: ClientsType, imgName: string) => {
		setTestFiles((prev) => {
			const arr = prev;

			for (let i = 0; i < arr.length; i++) {
				if (arr[i][0] === imgName) {
					if (arr[i][1].clients.includes(client)) {
						const filteredClients = arr[i][1].clients.filter((item) => item !== client);
						arr[i][1].clients = [...filteredClients];
					} else {
						arr[i][1].clients = [...arr[i][1].clients, client];
					}
				}
			}

			return [...arr];
		});
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const finalData = Array.from(testFiles);

		const formData = new FormData();
		formData.append("album_id", String(albumId));
		formData.append("Content-Type", "multipart/form-data");
		for (let i = 0; i < finalData.length; i++) {
			console.log(finalData[i]);
			formData.append("file", finalData[i][1].file, finalData[i][0]);
			formData.append(`clients${i}`, finalData[i][1].clients.map((item) => item.phone_number).join());
		}

		const data = await request("/photos", "POST", formData, {}, true);

		console.log(data);

		// addNewPhoto(data);
		// setFiles([]);
	};
	console.log(testFiles);

	return (
		<form className="form" onSubmit={fromHandler} encType="multipart/form-data">
			<div className="form__files">
				<input id="newPhotos" type="file" name="file" accept="image/*" multiple onChange={filesHandler} />
				<label htmlFor="newPhotos" className="btn">
					Choose Photos
				</label>
			</div>
			<div className="form__photos">
				{testFiles &&
					Array.from(testFiles).map((item) => (
						<div className="form__wrapper" key={item[0]}>
							<img className="form__photo" src={URL.createObjectURL(item[1].file)} alt={item[0]} />
							<button className="form__remove btn" type="button" onClick={() => removeFileHandler(item[0])}>
								&times;
							</button>
							<Select options={clients} value={item[1].clients} setTestFiles={selectClientsHandler} imgName={item[0]} />
						</div>
					))}
			</div>
			<button type="submit" className="btn">
				Upload Photos
			</button>
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{success ? <InfoMessage type="success" message="Photos were saved successfully" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
});

NewPhotosForm.displayName = "NewPhotosForm";
