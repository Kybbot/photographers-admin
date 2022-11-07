import React, { ChangeEvent, FC, FormEvent, memo, useState } from "react";

import { InfoMessage, Select, SelectInput } from "../../../components";

import { useAuthFetch } from "../../../hooks/useAuthFetch";
import { useAlbums } from "../../../stores/useAlbums";

type NewPhotosFormProps = {
	albumId: number;
};

export const NewPhotosForm: FC<NewPhotosFormProps> = memo(({ albumId }: NewPhotosFormProps) => {
	const { loading, error, success, request } = useAuthFetch();

	const clientsNumbers = useAlbums((state) => state.clientsNumbers);

	const [clientsMap, setClientsMap] = useState<Map<string, string[]>>();
	const [files, setFiles] = useState<File[]>([]);
	const [clientsError, setClientsError] = useState<string | null>(null);

	const filesHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files);

			const list = new Map<string, string[]>();

			for (let i = 0; i < files.length; i++) {
				list.set(files[i].name, []);
			}

			setFiles(files);
			setClientsMap(list);
		}
	};

	const removeFileHandler = (name: string) => {
		if (clientsMap) {
			const list = new Map(clientsMap);
			list.delete(name);

			setClientsMap(list);
			setFiles((prev) => prev.filter((item) => item.name !== name));
		}
	};

	const selectClientsHandler = (client: string, imgName: string) => {
		if (clientsMap) {
			const list = new Map(clientsMap);

			const clients = list.get(imgName);

			if (clients) {
				if (clients.includes(client)) {
					const filteredItem = clients.filter((item) => item !== client);
					list.set(imgName, filteredItem);
				} else {
					const newClients = [...clients, client];
					list.set(imgName, newClients);
				}
			}

			setClientsMap(list);
		}
	};

	const fromHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setClientsError(null);

		if (clientsMap && files) {
			const formData = new FormData();
			formData.append("album_id", String(albumId));
			formData.append("Content-Type", "multipart/form-data");
			for (let i = 0; i < files.length; i++) {
				const fileName = files[i].name;
				const clients = clientsMap.get(fileName)?.join();
				formData.append("file", files[i], files[i].name);
				if (clients) {
					formData.append(`clients${i}`, clients);
				} else {
					setClientsError(`Fill in user phone numbers for ${files[i].name}`);
					return;
				}
			}

			const data = await request("/photos", "POST", formData, {}, true);

			if (data?.success) {
				setTimeout(() => window.location.reload(), 1000);
			}
		}
	};

	return (
		<form className="form" onSubmit={fromHandler} encType="multipart/form-data">
			<div className="form__files">
				<input id="newPhotos" type="file" name="file" accept="image/*" multiple onChange={filesHandler} required />
				<label htmlFor="newPhotos" className="btn">
					Choose Photos
				</label>
			</div>
			<div className="form__photos">
				{clientsMap &&
					Array.from(clientsMap).map((item, index) => (
						<div className="form__wrapper" key={item[0]}>
							<img className="form__photo" src={URL.createObjectURL(files[index])} alt={item[0]} />
							<button className="form__remove btn" type="button" onClick={() => removeFileHandler(item[0])}>
								&times;
							</button>
							<Select options={clientsNumbers} value={item[1]} changeClients={selectClientsHandler} imgName={item[0]} />
							<SelectInput changeClients={selectClientsHandler} imgName={item[0]} />
						</div>
					))}
			</div>
			<button type="submit" className="btn" disabled={loading || !!error || success || !clientsMap?.size}>
				Upload Photos
			</button>
			{clientsError ? <InfoMessage type="loading" message={clientsError} /> : null}
			{loading ? <InfoMessage type="loading" message="Loading" /> : null}
			{success ? <InfoMessage type="success" message="Photos were saved successfully" /> : null}
			{error ? <InfoMessage type="error" message={error} /> : null}
		</form>
	);
});

NewPhotosForm.displayName = "NewPhotosForm";
