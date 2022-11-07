import React, { FC } from "react";

type InfoMessageProps = {
	type: "loading" | "success" | "error";
	message: string;
};

export const InfoMessage: FC<InfoMessageProps> = ({ type, message }) => {
	return <p className={`info-message info-message__${type}`}>{message}</p>;
};
