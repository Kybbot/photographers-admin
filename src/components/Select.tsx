import React, { useCallback, KeyboardEvent, useState, FC } from "react";

type SelectProps = {
	options: string[];
	imgName: string;
	value: string[];
	changeClients: (client: string, imgName: string) => void;
};

export const Select: FC<SelectProps> = ({ value, options, imgName, changeClients }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);

	const selectOption = useCallback(
		(option: string) => {
			changeClients(option, imgName);
		},
		[changeClients, imgName]
	);

	const isOptionSelected = (option: string) => {
		return value.includes(option);
	};

	const selectKeyHandler = (e: KeyboardEvent<HTMLDivElement>) => {
		switch (e.code) {
			case "Enter":
			case "Space":
				setIsOpen((prev) => !prev);
				if (isOpen) selectOption(options[highlightedIndex]);
				break;
			case "ArrowUp":
			case "ArrowDown": {
				if (!isOpen) {
					setIsOpen(true);
				}

				const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);

				if (newValue >= 0 && newValue < options.length) {
					setHighlightedIndex(newValue);
				}
				break;
			}
			case "Escape":
				setIsOpen(false);
				break;
		}
	};

	const liKeyHandler = (e: KeyboardEvent<HTMLLIElement>, option: string) => {
		e.stopPropagation();

		switch (e.code) {
			case "Enter":
			case "Space":
				selectOption(option);
				setIsOpen(false);
				break;
		}
	};

	return (
		<div
			onClick={() => setIsOpen((prev) => !prev)}
			onBlur={() => {
				setIsOpen(false);
				setHighlightedIndex(0);
			}}
			onKeyDown={selectKeyHandler}
			className="select__container"
			tabIndex={0}
			role="menu"
		>
			<span className="select__value">
				{value.map((v) => (
					<button
						type="button"
						key={v}
						onClick={(e) => {
							e.stopPropagation();
							selectOption(v);
						}}
						className="select__option-badge"
					>
						{v}
						<span className="select__remove">&times;</span>
					</button>
				))}
			</span>
			<div className="select__divider"></div>
			<div className="select__caret"></div>
			<ul className={`select__options ${isOpen ? "select__show" : ""}`}>
				{options.map((option, index) => (
					<li
						key={option}
						onMouseEnter={() => setHighlightedIndex(index)}
						className={`select__option ${isOptionSelected(option) ? "select__selected" : ""} ${
							index === highlightedIndex ? "select__highlighted" : ""
						}`}
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onKeyDown={(event) => liKeyHandler(event, option)}
						role="menuitem"
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
};
