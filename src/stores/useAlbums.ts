import create from "zustand";

import { AlbumType, ClientsType } from "../@types/api";

export type AlbumsStore = {
	albums: AlbumType[] | null;
	clientsNumbers: string[];
	setAllAlbums: (albums: AlbumType[]) => void;
	addNewAlbum: (album: AlbumType) => void;
	setAllClients: (clients: ClientsType[]) => void;
};

export const useAlbums = create<AlbumsStore>()((set, get) => ({
	albums: null,
	clientsNumbers: [],
	setAllAlbums: (albums) => {
		set({ albums: albums.sort((a, b) => b.id - a.id) });
	},
	addNewAlbum: (album) => {
		const { albums } = get();
		if (albums) {
			set({
				albums: [album, ...albums],
			});
		} else {
			set({
				albums: [album],
			});
		}
	},
	setAllClients: (clients) => {
		set({ clientsNumbers: clients.map((item) => item.phone_number) });
	},
}));
