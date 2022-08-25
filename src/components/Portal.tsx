import ReactDOM from "react-dom";
import React from "react";

type PortalProps = {
	children: React.ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ children }) => {
	return ReactDOM.createPortal(children, document.body);
};
