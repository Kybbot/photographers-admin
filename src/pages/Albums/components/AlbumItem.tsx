import React from "react";
import { Link } from "react-router-dom";

import { getRandomNumber } from "../../../utils/getRandomNumber";
import { gradients } from "../../../constants/gradients";
import { createdAlbum } from "../../../@types/api";

type AlbumItemProps = {
	data: createdAlbum;
	openCurrentAlbum: (album: createdAlbum) => void;
};

export const AlbumItem: React.FC<AlbumItemProps> = React.memo(({ data, openCurrentAlbum }: AlbumItemProps) => {
	console.log("AlbumItem");

	return (
		<article className="albums__article">
			<div className="albums__wrapper">
				<img
					className="albums__img"
					style={{ backgroundImage: gradients[getRandomNumber(0, gradients.length - 1)] }}
					src={
						data.album_logo
							? data.album_logo
							: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
					}
					alt={data.album_name}
				/>
			</div>
			<div className="albums__controls">
				<Link className="albums__link" to={`/album/${data.album_name}`}>
					{data.album_name}
				</Link>
				<button
					className="albums__setting"
					type="button"
					aria-label="Album settings"
					title="Album settings"
					onClick={() => openCurrentAlbum(data)}
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
			<p className="albums__location">{data.album_location}</p>
		</article>
	);
});

AlbumItem.displayName = "AlbumItem";
