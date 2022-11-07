import React, { FC, ReactNode, useEffect, useRef } from "react";

import { onTab } from "../utils/onTab";

type ModalProps = {
	title: string;
	description?: string;
	active: boolean;
	closeModal: () => void;
	children: ReactNode;
	modalContentFull?: boolean;
};

export const Modal: FC<ModalProps> = ({ title, description, active, closeModal, children, modalContentFull }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const closeBtnRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		let handleModalKeyboard: (event: KeyboardEvent) => void;

		if (active) {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input");
				const arrOfEllems = Array.from(elems);

				for (const elem of elems) {
					elem.style.display = "block";
				}

				handleModalKeyboard = onTab(wrapperRef, arrOfEllems, closeModal);

				document.addEventListener("keydown", handleModalKeyboard);
			}
		} else {
			if (wrapperRef.current) {
				const elems: NodeListOf<HTMLButtonElement & HTMLInputElement> =
					wrapperRef.current.querySelectorAll("button, input");

				for (const elem of elems) {
					elem.style.display = "none";
				}
			}
		}

		return () => document.removeEventListener("keydown", handleModalKeyboard);
	}, [active, closeModal]);

	useEffect(() => {
		if (active) {
			closeBtnRef.current?.focus();
		}
	}, [active]);

	return (
		<div aria-hidden={!active} className={`modal ${active ? "modal--visible" : ""}`}>
			<div
				ref={wrapperRef}
				className={`modal__content ${modalContentFull ? "modal__content--full" : ""}`}
				role="dialog"
				aria-modal="true"
				aria-label="Modal window"
			>
				<div className="modal__header">
					<div className="modal__wrapper">
						<h2 className="modal__titel">{title}</h2>
						<button ref={closeBtnRef} className="btn modal__btn" onClick={closeModal}>
							Close
						</button>
					</div>
					<p className="modal__description">{description}</p>
				</div>
				<div className="modal__body">{children}</div>
			</div>
		</div>
	);
};
