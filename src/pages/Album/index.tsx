import React from "react";
import { Link, useLocation } from "react-router-dom";

import { InfoMessage, Modal } from "../../components";
import { PhotoItem } from "./components/PhotoItem";
import { NewPhotosForm } from "./components/NewPhotosForm";
import { EditPhotoForm } from "./components/EditPhotoForm";

import { useModal } from "../../hooks/useModal";
import { useAuthFetch } from "../../hooks/useAuthFetch";

import { AlbumType, PhotoType } from "../../@types/api";

const Album: React.FC = () => {
	const { pathname } = useLocation();
	const { loading, error, request } = useAuthFetch();

	const [albumData, setAlbumData] = React.useState<AlbumType | null>(null);
	const [albumPhotos, setAlbumPhotos] = React.useState<PhotoType[]>([]);
	const [stopLoop, setStopLoop] = React.useState(false);

	const openBtnRef1 = React.useRef<HTMLButtonElement>(null);

	const { isActive: isActive1, openModal: openModal1, closeModal: closeModal1 } = useModal(openBtnRef1);
	const { isActive: isActive2, openModal: openModal2, closeModal: closeModal2 } = useModal();

	const [currentPhoto, setCurrentPhoto] = React.useState<PhotoType | null>(null);

	const openCurrentAlbum = React.useCallback(
		(photo: PhotoType) => {
			setCurrentPhoto(photo);
			openModal2();
		},
		[openModal2]
	);

	const addNewPhoto = React.useCallback((newData: PhotoType[]) => {
		setAlbumPhotos((prev) => [...prev, ...newData]);
	}, []);

	const updatePhoto = React.useCallback((photoId: number, newData: PhotoType) => {
		setAlbumPhotos((prev) =>
			prev.map((item) => {
				if (item.photo_id !== photoId) return item;

				return {
					...item,
					...newData,
				};
			})
		);
	}, []);

	const deletePhoto = React.useCallback((photoId: number) => {
		setAlbumPhotos((prev) => prev.filter((item) => item.photo_id !== photoId));
	}, []);

	React.useEffect(() => {
		const albumId = pathname.split("/")[2];

		const getAlbum = async () => {
			const data = await request<AlbumType>(`https://splastun2.node.shpp.me/api/album/${albumId}`, "GET");

			if (data) {
				setAlbumData(data);
			}
		};

		const getAlbumPhotos = async () => {
			const data = await request<PhotoType[]>(`https://splastun2.node.shpp.me/api/photos/${albumId}`, "GET");

			if (data) {
				setAlbumPhotos(data);
			}
		};

		if (!albumData && !albumPhotos.length && !stopLoop) {
			void getAlbum();
			void getAlbumPhotos();
			setStopLoop(true);
		}
	}, [request, pathname, albumData, albumPhotos, stopLoop]);

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
					<Modal active={isActive1} closeModal={closeModal1} title="Add new photos" description="Max 10 photos!">
						<NewPhotosForm albumId={albumData.album_id} addNewPhoto={addNewPhoto} />
					</Modal>
					<Modal active={isActive2} closeModal={closeModal2} title="Photo settings">
						{currentPhoto && <EditPhotoForm data={currentPhoto} updatePhoto={updatePhoto} deletePhoto={deletePhoto} />}
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
									onClick={openModal1}
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
								albumPhotos.map((item) => (
									<PhotoItem key={item.photo_id} photo={item} openCurrentAlbum={openCurrentAlbum} />
								))}
						</div>
					</section>
				</>
			) : null}
		</>
	);
};

export default Album;
