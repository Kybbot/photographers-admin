import React, { FC, memo } from "react";

import { PhotoType } from "../../../@types/api";

type PhotoItemProps = {
	photo: PhotoType;
};

export const PhotoItem: FC<PhotoItemProps> = memo(({ photo }: PhotoItemProps) => {
	return (
		<article className="section__article">
			<div className="section__wrapper">
				<img
					className="section__img"
					data-src={photo.photo_logo}
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
					alt={photo.photo_name}
				/>
			</div>
		</article>
	);
});

PhotoItem.displayName = "PhotoItem";
