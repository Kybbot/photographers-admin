import React from "react";

type InfoMessageProps = {
	type: "loading" | "success" | "error";
	message: string;
};

export const InfoMessage: React.FC<InfoMessageProps> = ({ type, message }) => {
	return <p className={`info-message info-message__${type}`}>{message}</p>;
};
