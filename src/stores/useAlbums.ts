import create from "zustand";

import { AlbumType } from "../@types/api";

export type AlbumsStore = {
	albums: AlbumType[];
	setAllAlbums: (albums: AlbumType[]) => void;
	addNewAlbum: (album: AlbumType) => void;
	updateAlbum: (album: AlbumType) => void;
	removeAlbum: (albumId: number) => void;
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
	updateAlbum: (album) => {
		const { albums } = get();

		set({
			albums: albums.map((item) => {
				if (item.album_id !== album.album_id) return item;

				return {
					...item,
					...album,
				};
			}),
		});
	},
	removeAlbum: (albumId) => {
		const { albums } = get();

		set({
			albums: albums.filter((item) => item.album_id !== albumId),
		});
	},
}));
