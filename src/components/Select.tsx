import React, { useCallback, KeyboardEvent } from "react";

import { SelectOption } from "../@types/select";

type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
	multiple: true;
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
	options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select: React.FC<SelectProps> = ({ multiple, value, options, onChange }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [highlightedIndex, setHighlightedIndex] = React.useState(0);

	const clearOptions = () => {
		multiple ? onChange([]) : onChange(undefined);
	};

	const selectOption = useCallback(
		(option: SelectOption) => {
			if (multiple) {
				if (value.includes(option)) {
					onChange(value.filter((o) => o !== option));
				} else {
					onChange([...value, option]);
				}
			} else {
				if (option !== value) onChange(option);
			}
		},
		[multiple, onChange, value]
	);

	const isOptionSelected = (option: SelectOption) => {
		return multiple ? value.includes(option) : option === value;
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

	const liKeyHandler = (e: KeyboardEvent<HTMLLIElement>, option: SelectOption) => {
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
				{multiple
					? value.map((v) => (
							<button
								type="button"
								key={v.value}
								onClick={(e) => {
									e.stopPropagation();
									selectOption(v);
								}}
								className="select__option-badge"
							>
								{v.label}
								<span className="select__remove">&times;</span>
							</button>
					  ))
					: value?.label}
			</span>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					clearOptions();
				}}
				className="select__close"
			>
				&times;
			</button>
			<div className="select__divider"></div>
			<div className="select__caret"></div>
			<ul className={`select__options ${isOpen ? "select__show" : ""}`}>
				{options.map((option, index) => (
					<li
						key={option.value}
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
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};
