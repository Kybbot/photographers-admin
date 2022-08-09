import React from "react";

type ModalProps = {
	title: string;
	active: boolean;
	closeModal: () => void;
	children: React.ReactNode;
};

type Ref = HTMLDivElement;

export const Modal = React.forwardRef<Ref, ModalProps>(({ title, active, closeModal, children }, ref) => {
	return (
		<div aria-hidden={!active} className={`modal ${active ? "modal--visible" : ""}`}>
			<div ref={ref} className="modal__content" role="dialog" aria-modal="true" aria-label="Modal window">
				<div className="modal__header">
					<h2 className="modal__titel">{title}</h2>
					<button className="btn modal__btn" onClick={closeModal}>
						Close
					</button>
				</div>
				<div className="modal__body">{children}</div>
			</div>
		</div>
	);
});
Modal.displayName = "Modal";
