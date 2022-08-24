import React from "react";
import { Link } from "react-router-dom";

import { EditAlbumForm, Modal, NewAlbumForm, InfoMessage } from "../components";
import { useModal } from "../hooks/useModal";
import { useAuthFetch } from "../hooks/useAuthFetch";
import { gradients } from "../constants/gradients";
import { currentAlbumType } from "../@types/albums";
import { createdAlbum, getAllAlbumsResponse } from "../@types/api";
import { getRandomNumber } from "../utils/getRandomNumber";

const Albums: React.FC = () => {
	const { loading, error, request } = useAuthFetch();

	const [result, setResult] = React.useState<getAllAlbumsResponse>([]);

	const modalRef1 = React.createRef<HTMLDivElement>();
	const openBtnRef1 = React.useRef<HTMLButtonElement>(null);

	const modalRef2 = React.createRef<HTMLDivElement>();
	const openBtnRef2 = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal(modalRef1, openBtnRef1);
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal(modalRef2, openBtnRef2);

	const [currentAlbum, setCurrentAlbum] = React.useState<currentAlbumType | null>(null);

	const openCurrentAlbum = (album: createdAlbum) => {
		setCurrentAlbum({
			name: album.album_name,
			location: album.album_location,
			date: album.date.split("T")[0],
		});
		openModal2();
	};

	React.useEffect(() => {
		const getAlbums = async () => {
			const data = await request<getAllAlbumsResponse>("https://splastun2.node.shpp.me/api/albums", "GET");

			if (data) {
				setResult(data);
			}
		};

		void getAlbums();
	}, [request]);

	if (loading) {
		return <InfoMessage type="loading" message="Loading" />;
	}

	if (error) {
		return <InfoMessage type="error" message={error} />;
	}

	return (
		<>
			<p>{loading ? "loading" : ""}</p>
			<p>{error ? error : ""}</p>
			<Modal ref={modalRef1} active={isActive1} closeModal={closeModal1} title="Add new album">
				<NewAlbumForm />
			</Modal>
			<Modal ref={modalRef2} active={isActive2} closeModal={closeModal2} title="Album settings">
				{currentAlbum && <EditAlbumForm data={currentAlbum} />}
			</Modal>
			<section className="albums" aria-labelledby="albumsSectionTitle">
				<h1 className="albums__title" id="albumsSectionTitle">
					Albums Catalog
				</h1>
				<div className="albums__grid">
					<article className="albums__article">
						<button
							ref={openBtnRef1}
							type="button"
							className="albums__new"
							onClick={openModal1}
							aria-label="Add new album"
						>
							+
						</button>
						<div className="albums__controls">
							<p className="albums__name">Add new album</p>
						</div>
						<p className="albums__location">Site</p>
					</article>
					{result &&
						result.length > 0 &&
						result.map((item) => (
							<article className="albums__article" key={item.album_id}>
								<div className="albums__wrapper">
									<img
										className="albums__img"
										style={{ backgroundImage: gradients[getRandomNumber(0, gradients.length - 1)] }}
										src={
											item.album_logo
												? item.album_logo
												: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
										}
										alt={item.album_name}
									/>
								</div>
								<div className="albums__controls">
									<Link className="albums__link" to={`/album/${item.album_name}`}>
										{item.album_name}
									</Link>
									<button
										className="albums__setting"
										type="button"
										aria-label="Album settings"
										title="Album settings"
										onClick={() => openCurrentAlbum(item)}
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
								<p className="albums__location">{item.album_location}</p>
							</article>
						))}
				</div>
			</section>
		</>
	);
};

export default Albums;
