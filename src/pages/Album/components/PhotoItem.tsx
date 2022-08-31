import React from "react";

import { PhotoType } from "../../../@types/api";

type PhotoItemProps = {
	photo: PhotoType;
	openCurrentAlbum: (photo: PhotoType, btnRef: React.RefObject<HTMLButtonElement>) => void;
};

export const PhotoItem: React.FC<PhotoItemProps> = React.memo(({ photo, openCurrentAlbum }: PhotoItemProps) => {
	const btnRef = React.useRef<HTMLButtonElement>(null);

	return (
		<article className="section__article">
			<div className="section__wrapper">
				<img className="section__img" src={photo.photo_logo} alt={photo.photo_name} />
			</div>
			<div className="section__controls">
				<p className="section__name">{photo.photo_name === "undefined" ? "Empty name" : photo.photo_name}</p>
				<button
					className="section__setting"
					type="button"
					aria-label="Photo settings"
					title="Photo settings"
					ref={btnRef}
					onClick={() => openCurrentAlbum(photo, btnRef)}
				>
					<svg
						focusable="false"
						aria-hidden="true"
						fill="none"
						width="16"
						height="16"
						stroke="#000000"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<use xlinkHref="#settings" />
					</svg>
				</button>
			</div>
		</article>
	);
});

PhotoItem.displayName = "PhotoItem";
