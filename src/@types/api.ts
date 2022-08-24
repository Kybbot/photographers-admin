export type loginResponse = {
	token?: string;
	user?: {
		person_id: number;
		login: string;
		fullname: string;
		email: string;
	};
	message?: string;
};

export type newAlbum = {
	album_name: string;
	album_location: string;
	date: string;
};

export type createdAlbum = {
	album_id: number;
	album_name: string;
	album_location: string;
	album_logo: string | null;
	person_id: number;
	date: string;
};

export type getAlbumResponse = createdAlbum;
export type getAllAlbumsResponse = createdAlbum[];
