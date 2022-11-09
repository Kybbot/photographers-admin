import { useCallback, useState } from "react";

import { useAuthContext } from "../context/AuthContext";

import { ApiResponse } from "../@types/api";

export const useAuthFetch = () => {
	const { authFetch } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const request = useCallback(
		async <T,>(endpoint: string, method?: string, body?: BodyInit, headers?: HeadersInit, isItImage?: boolean) => {
			setError(null);
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

				const data = (await response.json()) as ApiResponse<T>;

				if (!response.ok && !data.success) {
					setLoading(false);
					throw new Error(data.error.message);
				}

				if (data.success) {
					setLoading(false);
					return data;
				}
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
