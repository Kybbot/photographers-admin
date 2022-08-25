import React from "react";

import { LocalStorageTokenSchema, LocalStorageTokenType, TokenPayloadSchema, observerType } from "../@types/jwt";

const useCreateTokenProvider = () => {
	const _token = React.useRef<LocalStorageTokenType>(
		LocalStorageTokenSchema.parse(JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH") || "null")) || null
	);

	const getExpirationDate = React.useCallback((jwtToken: string): number | null => {
		if (!jwtToken) {
			return null;
		}

		const jwt = TokenPayloadSchema.parse(JSON.parse(atob(jwtToken.split(".")[1])));

		return (jwt && jwt.exp && jwt.exp * 1000) || null;
	}, []);

	const isExpired = React.useCallback((exp: number | null) => {
		if (!exp) {
			return false;
		}

		return Date.now() > exp;
	}, []);

	const observers: Array<observerType> = React.useMemo(() => {
		return [];
	}, []);

	const subscribe = React.useCallback(
		(observer: observerType) => {
			observers.push(observer);
		},
		[observers]
	);

	const unsubscribe = React.useCallback(
		(observer: observerType) => {
			observers.filter((item) => item !== observer);
		},
		[observers]
	);

	const notify = React.useCallback(() => {
		const isLogged = !!_token.current;
		observers.forEach((observer) => observer(isLogged));
	}, [observers]);

	const setToken = React.useCallback(
		(token: LocalStorageTokenType) => {
			if (token) {
				localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
			} else {
				localStorage.removeItem("REACT_TOKEN_AUTH");
			}

			_token.current = token;
			notify();
		},
		[notify]
	);

	const getToken = React.useCallback(() => {
		if (!_token.current) {
			return null;
		}

		if (isExpired(getExpirationDate(_token.current.accessToken))) {
			setToken(null);
		}

		return _token.current && _token.current.accessToken;
	}, [setToken, isExpired, getExpirationDate]);

	const isLoggedIn = React.useCallback(() => {
		return !!getToken();
	}, [getToken]);

	return {
		getToken,
		isLoggedIn,
		setToken,
		subscribe,
		unsubscribe,
	};
};

export const useCreateAuthProvider = () => {
	const tokenProvider = useCreateTokenProvider();

	const saveToken = React.useCallback(
		(newToken: LocalStorageTokenType) => {
			tokenProvider.setToken(newToken);
		},
		[tokenProvider]
	);

	const deleteToken = React.useCallback(() => {
		tokenProvider.setToken(null);
	}, [tokenProvider]);

	const authFetch = React.useCallback(
		(input: RequestInfo, init?: RequestInit): Promise<Response> => {
			const token = tokenProvider.getToken();

			init = init || {};

			init.headers = {
				...init.headers,
				Authorization: `Bearer ${String(token)}`,
			};

			return fetch(input, init);
		},
		[tokenProvider]
	);

	const useAuth = () => {
		const [isLogged, setIsLogged] = React.useState(tokenProvider.isLoggedIn());

		React.useEffect(() => {
			const listener = (newIsLogged: boolean) => {
				setIsLogged(newIsLogged);
			};

			tokenProvider.subscribe(listener);

			return () => {
				tokenProvider.unsubscribe(listener);
			};
		}, []);

		return isLogged;
	};

	return {
		useAuth,
		authFetch,
		saveToken,
		deleteToken,
	};
};
