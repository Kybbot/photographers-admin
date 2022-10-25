import React, { FC, useState } from "react";

type SelectInputProps = {
	imgName: string;
	changeClients: (client: string, imgName: string) => void;
};

export const SelectInput: FC<SelectInputProps> = ({ imgName, changeClients }) => {
	const [inputValue, setInputValue] = useState("");

	const btnHandler = () => {
		changeClients(inputValue, imgName);
		setInputValue("");
	};

	return (
		<div className="selectInput">
			<input
				className="form__input form__input--small selectInput__input"
				type="text"
				inputMode="numeric"
				name="newTel"
				id="newTel"
				placeholder="Add new phone number"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
			/>
			<button type="button" className="btn selectInput__btn" onClick={btnHandler}>
				+
			</button>
		</div>
	);
};
