import React, { ChangeEvent, FormEvent } from "react";

export const NewPhotosForm = () => {
	const [files, setFiles] = React.useState<File[] | []>([]);

	const filesHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const files = Array.from(event.target.files);

			setFiles((prev) => [...prev, ...files]);
		}
	};

	const removeFile = (name: string) => {
		setFiles((prev) => {
			return Array.from(prev).filter((item) => item.name !== name);
		});
	};

	const fromHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(files);
		setFiles([]);
	};

	return (
		<form className="form" onSubmit={fromHandler} encType="multipart/form-data">
			<div className="form__files">
				<input type="file" accept=".png,.jpg,.webp" multiple id="newPhotos" name="newPhotos" onChange={filesHandler} />
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
				Upload Photos
			</button>
		</form>
	);
};

export default NewPhotosForm;
