import create from "zustand";

import { AlbumType, PhotoType } from "../@types/api";

export type PhotosStore = {
	albumData: AlbumType | null;
	photos: PhotoType[];
	setAlbumData: (data: AlbumType) => void;
	setAlbumPhotos: (photos: PhotoType[]) => void;
};

export const usePhotos = create<PhotosStore>()((set) => ({
	albumData: null,
	photos: [],
	setAlbumData: (data) => {
		set({ albumData: data });
	},
	setAlbumPhotos: (photos) => {
		set({ photos: photos });
	},
}));
