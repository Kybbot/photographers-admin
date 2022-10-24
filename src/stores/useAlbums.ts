import create from "zustand";

import { AlbumType, ClientsType } from "../@types/api";

export type AlbumsStore = {
	albums: AlbumType[];
	clients: ClientsType[];
	setAllAlbums: (albums: AlbumType[]) => void;
	addNewAlbum: (album: AlbumType) => void;
	setAllClients: (clients: ClientsType[]) => void;
};

export const useAlbums = create<AlbumsStore>()((set, get) => ({
	albums: [],
	clients: [],
	setAllAlbums: (albums) => {
		set({ albums: albums });
	},
	addNewAlbum: (album) => {
		const { albums } = get();

		set({
			albums: [...albums, album],
		});
	},
	setAllClients: (clients) => {
		set({ clients: clients });
	},
}));
