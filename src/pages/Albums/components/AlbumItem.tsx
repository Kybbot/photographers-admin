import React, { FC } from "react";
import { Link } from "react-router-dom";

import { gradients } from "../../../constants/gradients";
import { getRandomNumber } from "../../../utils/getRandomNumber";

import { AlbumType } from "../../../@types/api";

type AlbumItemProps = {
	data: AlbumType;
};

export const AlbumItem: FC<AlbumItemProps> = React.memo(({ data }: AlbumItemProps) => {
	return (
		<article className="section__article">
			<div className="section__wrapper">
				<img
					className="section__img"
					style={{ backgroundImage: gradients[getRandomNumber(0, gradients.length - 1)] }}
					data-src={
						data.album_logo
							? data.album_logo
							: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
					}
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
					alt={data.album_name}
				/>
			</div>
			<div className="section__controls">
				<Link
					className="section__link"
					to={`/album/${data.id}`}
					state={{
						albumId: data.id,
					}}
				>
					{data.album_name}
				</Link>
			</div>
			<p className="section__location">{data.album_location}</p>
		</article>
	);
});

AlbumItem.displayName = "AlbumItem";
