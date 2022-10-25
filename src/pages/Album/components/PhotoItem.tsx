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
		</article>
	);
});

PhotoItem.displayName = "PhotoItem";
