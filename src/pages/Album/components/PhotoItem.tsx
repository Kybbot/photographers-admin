import React from "react";

import { PhotoType } from "../../../@types/api";

type PhotoItemProps = {
	photo: PhotoType;
};

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(({ photo }: PhotoItemProps) => {
	return (
		<article className="section__article">
			<div className="section__wrapper">
				<img className="section__img" src={photo.photo_logo} alt={photo.photo_name} />
			</div>
			<div className="section__controls">
				<p className="section__name">{photo.photo_name === "undefined" ? "Empty name" : photo.photo_name}</p>
			</div>
		</article>
	);
});

PhotoItem.displayName = "PhotoItem";
