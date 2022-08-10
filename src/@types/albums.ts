export type currentAlbumType = {
	name: string;
	location: string;
	date: string;
};

export type EditAlbumFormProps = {
	data: {
		name: string;
		location: string;
		date: string;
	};
};

export type currentPhotoType = {
	name: string;
	location: string;
	people: string;
};

export type EditPhotoFormProps = {
	data: {
		name: string;
		location: string;
		people: string;
	};
};
