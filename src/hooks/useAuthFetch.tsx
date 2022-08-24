import React from "react";

import { useAuthContext } from "../context/AuthContext";

export const useAuthFetch = () => {
	const { authFetch } = useAuthContext();
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const request = React.useCallback(
		async <T,>(url: string, method?: string, body?: BodyInit, headers?: HeadersInit) => {
			setLoading(true);

			try {
				if (body) {
					headers = {
						"Content-Type": "application/json",
					};
				}

				const init = {
					method,
					body,
					headers,
				};

				const response = await authFetch(url, init);

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
