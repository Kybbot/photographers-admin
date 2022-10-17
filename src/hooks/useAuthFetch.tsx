import React from "react";

import { useAuthContext } from "../context/AuthContext";

export const useAuthFetch = () => {
	const { authFetch } = useAuthContext();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const request = React.useCallback(
		async <T,>(endpoint: string, method?: string, body?: BodyInit, headers?: HeadersInit, isItImage?: boolean) => {
			setLoading(true);

			try {
				if (!isItImage) {
					if (body) {
						headers = {
							...headers,
							"Content-Type": "application/json",
						};
					}
				}

				const init = {
					method,
					body,
					headers,
				};

				const response = await authFetch(`${import.meta.env.VITE_API_ENDPOINT}${endpoint}`, init);

				if (!response.ok) {
					throw new Error(response.statusText);
				}

				const data = (await response.json()) as T;

				setLoading(false);

				return data;
			} catch (error) {
				setLoading(false);
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		},
		[authFetch]
	);

	return { loading, error, request };
};
