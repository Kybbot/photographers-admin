import React from "react";

import { useAuthContext } from "../../context/AuthContext";

import { Modal, InfoMessage } from "../../components";
import { NewAlbumForm } from "./components/NewAlbumForm";
import { EditAlbumForm } from "./components/EditAlbumForm";
import { AlbumItem } from "./components/AlbumItem";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { useAlbums } from "../../stores/useAlbums";

import { AlbumType } from "../../@types/api";
// import { Popup } from "../../components/Popup";

const Albums: React.FC = () => {
	const { deleteToken } = useAuthContext();
	const { loading, error, request } = useAuthFetch();

	const [albums, setAllAlbums] = useAlbums((state) => [state.albums, state.setAllAlbums]);

	const openBtnRef1 = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal(openBtnRef1);
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const [currentAlbum, setCurrentAlbum] = React.useState<AlbumType | null>(null);

	const openCurrentAlbum = React.useCallback(
		(album: AlbumType) => {
			setCurrentAlbum({
				...album,
				date: album.date.split("T")[0],
			});
			openModal2();
		},
		[openModal2]
	);

	React.useEffect(() => {
		const getAlbums = async () => {
			const data = await request<AlbumType[]>("https://splastun2.node.shpp.me/api/albums", "GET");

			if (data) {
				setAllAlbums(data);
			}
		};

		if (!albums.length) {
			void getAlbums();
		}
	}, [request, albums, setAllAlbums]);

	if (loading) {
		return <InfoMessage type="loading" message="Loading" />;
	}

	if (error) {
		return <InfoMessage type="error" message={error} />;
	}

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
			<section className="section" aria-labelledby="albumsSectionTitle">
				<div className="section__container">
					<h1 className="section__title" id="albumsSectionTitle">
						Albums Catalog
					</h1>
					<button onClick={deleteToken} type="button" className="btn section__btn">
						Logout
					</button>
				</div>
				<div className="section__grid">
					<article className="section__article">
						<button
							ref={openBtnRef1}
							type="button"
							className="section__new"
							onClick={openModal1}
							aria-label="Add new album"
						>
							+
						</button>
						<div className="section__controls">
							<p className="section__name">Add new album</p>
						</div>
						<p className="section__location">Site</p>
					</article>
					{albums &&
						albums.length > 0 &&
						albums.map((item) => <AlbumItem key={item.album_id} data={item} openCurrentAlbum={openCurrentAlbum} />)}
				</div>
			</section>
		</>
	);
};

export default Albums;
