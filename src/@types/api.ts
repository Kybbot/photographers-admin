type loginResult = {
	token: {
		accessToken: string;
	};
	user: {
		person_id: number;
		login: string;
	};
	logged: true;
};

type loginError = {
	message: string;
	logged: false;
};

export type loginResponse = loginResult | loginError;

export type AlbumType = {
	id: number;
	album_name: string;
	album_location: string;
	album_logo: string | null;
	person_id: number;
	date: string;
};

export type PhotoType = {
	id: number;
	photo_logo: string;
	photo_name: string;
	photo_url: string;
	album_id: number;
};

type ApiResult<T> = {
	data: T;
	success: true;
};

type ApiError = {
	error: {
		message: string;
	};
	success: false;
};

export type ApiResponse<T> = ApiError | ApiResult<T>;
