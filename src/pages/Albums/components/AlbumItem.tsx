import React from "react";
import { Link } from "react-router-dom";

import { gradients } from "../../../constants/gradients";
import { getRandomNumber } from "../../../utils/getRandomNumber";

import { AlbumType } from "../../../@types/api";

type AlbumItemProps = {
	data: AlbumType;
	openCurrentAlbum: (album: AlbumType, btnRef: React.RefObject<HTMLButtonElement>) => void;
};

export const AlbumItem: React.FC<AlbumItemProps> = React.memo(({ data, openCurrentAlbum }: AlbumItemProps) => {
	const btnRef = React.useRef<HTMLButtonElement>(null);

	return (
		<article className="section__article">
			<div className="section__wrapper">
				<img
					className="section__img"
					style={{ backgroundImage: gradients[getRandomNumber(0, gradients.length - 1)] }}
					src={
						data.album_logo
							? data.album_logo
							: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
					}
					alt={data.album_name}
				/>
			</div>
			<div className="section__controls">
				<Link
					className="section__link"
					to={`/album/${data.album_id}`}
					state={{
						albumId: data.album_id,
					}}
				>
					{data.album_name}
				</Link>
				<button
					className="section__setting"
					type="button"
					aria-label="Album settings"
					title="Album settings"
					ref={btnRef}
					onClick={() => openCurrentAlbum(data, btnRef)}
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
			<p className="section__location">{data.album_location}</p>
		</article>
	);
});

AlbumItem.displayName = "AlbumItem";
