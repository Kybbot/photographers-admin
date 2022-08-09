import React from "react";

type useModalProps = (
	modalRef: React.RefObject<HTMLDivElement>,
	openBtnRef: React.RefObject<HTMLButtonElement>
) => {
	isActive: boolean;
	openModal: () => void;
	closeModal: () => void;
};

export const useModal: useModalProps = (modalRef, openBtnRef) => {
	const [isActive, setActive] = React.useState(false);

	const openModal = React.useCallback(() => {
		document.body.style.overflow = "hidden";
		const btn = modalRef.current?.querySelector(".modal__btn") as HTMLElement;
		btn.focus();
		setActive((prev) => !prev);
	}, [modalRef]);

	const closeModal = React.useCallback(() => {
		document.body.style.overflow = "initial";
		openBtnRef.current?.focus();
		setActive((prev) => !prev);
	}, [openBtnRef]);

	return { isActive, openModal, closeModal };
};
