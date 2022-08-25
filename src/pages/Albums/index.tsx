import React from "react";

import { NewAlbumForm } from "./components/NewAlbumForm";
import { EditAlbumForm } from "./components/EditAlbumForm";
import { Modal, InfoMessage } from "../../components";
import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { currentAlbumType } from "../../@types/albums";
import { createdAlbum, getAllAlbumsResponse } from "../../@types/api";
import { useAuthContext } from "../../context/AuthContext";
import { AlbumItem } from "./components/AlbumItem";
// import { Popup } from "../../components/Popup";

const Albums: React.FC = () => {
	const { deleteToken } = useAuthContext();
	const { loading, error, request } = useAuthFetch();

	const [result, setResult] = React.useState<getAllAlbumsResponse>([]);

	const openBtnRef1 = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal(openBtnRef1);
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const [currentAlbum, setCurrentAlbum] = React.useState<currentAlbumType | null>(null);

	const openCurrentAlbum = React.useCallback(
		(album: createdAlbum) => {
			setCurrentAlbum({
				name: album.album_name,
				location: album.album_location,
				date: album.date.split("T")[0],
			});
			openModal2();
		},
		[openModal2]
	);

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

	console.log("Albums");

	return (
		<>
			{/* <Popup isOpend={isActive1} onClose={closeModal1} title="Add new album">
				<NewAlbumForm />
			</Popup>
			<Popup isOpend={isActive2} onClose={closeModal2} title="Album settings">
				{currentAlbum && <EditAlbumForm data={currentAlbum} />}
			</Popup> */}
			<Modal active={isActive1} closeModal={closeModal1} title="Add new album">
				<NewAlbumForm />
			</Modal>
			<Modal active={isActive2} closeModal={closeModal2} title="Album settings">
				{currentAlbum && <EditAlbumForm data={currentAlbum} />}
			</Modal>
			<section className="albums" aria-labelledby="albumsSectionTitle">
				<div className="albums__container">
					<h1 className="albums__title" id="albumsSectionTitle">
						Albums Catalog
					</h1>
					<button onClick={deleteToken} type="button" className="btn albums__btn">
						Logout
					</button>
				</div>
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
						result.map((item) => <AlbumItem key={item.album_id} data={item} openCurrentAlbum={openCurrentAlbum} />)}
				</div>
			</section>
		</>
	);
};

export default Albums;
