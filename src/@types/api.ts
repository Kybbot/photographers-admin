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
