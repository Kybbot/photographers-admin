import React from "react";

type useModalProps = (openBtnRef?: React.RefObject<HTMLButtonElement>) => {
	isActive: boolean;
	openModal: () => void;
	closeModal: () => void;
};

export const useModal: useModalProps = (openBtnRef) => {
	const [isActive, setActive] = React.useState(false);

	const openModal = React.useCallback(() => {
		document.body.style.overflow = "hidden";
		setActive(true);
	}, []);

	const closeModal = React.useCallback(() => {
		document.body.style.overflow = "initial";
		openBtnRef?.current?.focus();
		setActive(false);
	}, [openBtnRef]);

	return { isActive, openModal, closeModal };
};
