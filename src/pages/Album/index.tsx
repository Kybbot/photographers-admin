import React from "react";
import { Link, useLocation } from "react-router-dom";

import { InfoMessage, Modal } from "../../components";
import { PhotoItem } from "./components/PhotoItem";
import { NewPhotosForm } from "./components/NewPhotosForm";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";
import { usePhotos } from "../../stores/usePhotos";

import { AlbumType, PhotoType } from "../../@types/api";

const Album: React.FC = () => {
	const { pathname } = useLocation();
	const { loading, error, request } = useAuthFetch();

	const [albumData, setAlbumData, albumPhotos, setAlbumPhotos] = usePhotos((state) => [
		state.albumData,
		state.setAlbumData,
		state.photos,
		state.setAlbumPhotos,
	]);

	const openBtnRef1 = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal();

	React.useEffect(() => {
		const albumId = pathname.split("/")[2];

		const getAlbum = async () => {
			const result = await request<[AlbumType]>(`/album/${albumId}`, "GET");

			if (result?.success) {
				setAlbumData(result.data[0]);
			}
		};

		const getAlbumPhotos = async () => {
			const result = await request<PhotoType[]>(`/photos/${albumId}`, "GET");

			if (result?.success) {
				setAlbumPhotos(result.data);
			}
		};

		void getAlbum();
		void getAlbumPhotos();
	}, [request, pathname, setAlbumData, setAlbumPhotos]);

	React.useEffect(() => {
		return () => setAlbumPhotos([]);
	}, [setAlbumPhotos]);

	if (loading) {
		return <InfoMessage type="loading" message="Loading" />;
	}

	if (error) {
		return <InfoMessage type="error" message={error} />;
	}

	return (
		<>
			{albumData && Object.keys(albumData).length !== 0 ? (
				<>
					<Modal active={isActive1} closeModal={closeModal1} title="Add new photos">
						<NewPhotosForm albumId={albumData.id} />
					</Modal>
					<section className="section" aria-labelledby="albumSectionTitle">
						<div className="section__container">
							<h1 className="section__title" id="albumSectionTitle">
								{albumData.album_name}
							</h1>
							<Link to="/" className="btn section__btn" aria-label="Go back" title="Go back">
								Go back
							</Link>
						</div>
						<div className="section__grid">
							<article className="section__article">
								<button
									ref={openBtnRef1}
									type="button"
									className="section__new"
									onClick={() => openModal1(openBtnRef1)}
									aria-label="Add new photos"
								>
									+
								</button>
								<div className="section__controls">
									<p className="section__name">Add new photos</p>
								</div>
							</article>
							{albumPhotos &&
								albumPhotos.length > 0 &&
								albumPhotos.map((item) => <PhotoItem key={item.id} photo={item} />)}
						</div>
					</section>
				</>
			) : null}
		</>
	);
};

export default Album;
