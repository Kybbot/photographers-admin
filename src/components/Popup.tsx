import React from "react";

import { Portal } from "./Portal";

type PopupPorps = {
	children: React.ReactNode;
	isOpend: boolean;
	onClose: () => void;
	title: string;
};

export const Popup: React.FC<PopupPorps> = ({ children, isOpend, onClose, title }) => {
	const closeBtnRef = React.useRef<HTMLButtonElement>(null);

	React.useEffect(() => {
		if (isOpend) {
			closeBtnRef.current?.focus();
		}
	}, [isOpend]);

	return (
		<Portal>
			<div aria-hidden={!isOpend} className={`modal ${isOpend ? "modal--visible" : ""}`}>
				<div className="modal__content" role="dialog" aria-modal="true" aria-label="Modal window">
					<div className="modal__header">
						<h2 className="modal__titel">{title}</h2>
						<button ref={closeBtnRef} className="btn modal__btn" onClick={onClose}>
							Close
						</button>
					</div>
					<div className="modal__body">{children}</div>
				</div>
			</div>
		</Portal>
	);
};

Popup.displayName = "Popup";
