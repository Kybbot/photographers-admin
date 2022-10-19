import create from "zustand";

import { AlbumType } from "../@types/api";

export type AlbumsStore = {
	albums: AlbumType[];
	setAllAlbums: (albums: AlbumType[]) => void;
	addNewAlbum: (album: AlbumType) => void;
};

export const useAlbums = create<AlbumsStore>()((set, get) => ({
	albums: [],
	setAllAlbums: (albums) => {
		set({ albums: albums });
	},
	addNewAlbum: (album) => {
		const { albums } = get();

		set({
			albums: [...albums, album],
		});
	},
}));
