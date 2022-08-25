import React from "react";

type ModalProps = {
	title: string;
	active: boolean;
	closeModal: () => void;
	children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ title, active, closeModal, children }) => {
	const closeBtnRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (active) {
			closeBtnRef.current?.focus();
		}
	}, [active]);

	return (
		<div aria-hidden={!active} className={`modal ${active ? "modal--visible" : ""}`}>
			<div className="modal__content" role="dialog" aria-modal="true" aria-label="Modal window">
				<div className="modal__header">
					<h2 className="modal__titel">{title}</h2>
					<button ref={closeBtnRef} className="btn modal__btn" onClick={closeModal}>
						Close
					</button>
				</div>
				<div className="modal__body">{children}</div>
			</div>
		</div>
	);
};
Modal.displayName = "Modal";
