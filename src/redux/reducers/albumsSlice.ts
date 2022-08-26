import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlbumType } from "../../@types/api";

const initialState: AlbumType[] = [];

const albumsSlice = createSlice({
	name: "albums",
	initialState,
	reducers: {
		setAllAlbums: (state, action: PayloadAction<AlbumType[]>) => (state = action.payload),
		addNewAlbum: (state, action: PayloadAction<AlbumType>) => {
			state.push(action.payload);
		},
		removeAlbum: (state, action: PayloadAction<number>) => {
			return state.filter((item) => item.album_id !== action.payload);
		},
	},
});

export const { setAllAlbums, addNewAlbum, removeAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
