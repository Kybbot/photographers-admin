import create from "zustand";

import { AlbumType, PhotoType } from "../@types/api";

export type PhotosStore = {
	albumData: AlbumType | null;
	photos: PhotoType[];
	setAlbumData: (data: AlbumType) => void;
	setAlbumPhotos: (photos: PhotoType[]) => void;
	addNewPhoto: (newPhotos: PhotoType[]) => void;
	updatePhoto: (photo: PhotoType) => void;
	deletePhoto: (photoId: number) => void;
};

export const usePhotos = create<PhotosStore>()((set, get) => ({
	albumData: null,
	photos: [],
	setAlbumData: (data) => {
		set({ albumData: data });
	},
	setAlbumPhotos: (photos) => {
		set({ photos: photos });
	},
	addNewPhoto: (newPhotos) => {
		const { photos } = get();

		set({
			photos: [...photos, ...newPhotos],
		});
	},
	updatePhoto: (photo) => {
		const { photos } = get();

		set({
			photos: photos.map((item) => {
				if (item.photo_id !== photo.photo_id) return item;

				return {
					...item,
					...photo,
				};
			}),
		});
	},
	deletePhoto: (photoId) => {
		const { photos } = get();

		set({
			photos: photos.filter((item) => item.photo_id !== photoId),
		});
	},
}));
