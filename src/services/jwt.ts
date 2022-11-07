import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { LocalStorageTokenSchema, LocalStorageTokenType, TokenPayloadSchema, observerType } from "../@types/jwt";

const useCreateTokenProvider = () => {
	const _token = useRef<LocalStorageTokenType>(
		LocalStorageTokenSchema.parse(JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH") || "null")) || null
	);

	const getExpirationDate = useCallback((jwtToken: string): number | null => {
		if (!jwtToken) {
			return null;
		}

		const jwt = TokenPayloadSchema.parse(JSON.parse(atob(jwtToken.split(".")[1])));

		return (jwt && jwt.exp && jwt.exp * 1000) || null;
	}, []);

	const isExpired = useCallback((exp: number | null) => {
		if (!exp) {
			return false;
		}

		return Date.now() > exp;
	}, []);

	const observers: Array<observerType> = useMemo(() => {
		return [];
	}, []);

	const subscribe = useCallback(
		(observer: observerType) => {
			observers.push(observer);
		},
		[observers]
	);

	const unsubscribe = useCallback(
		(observer: observerType) => {
			observers.filter((item) => item !== observer);
		},
		[observers]
	);

	const notify = useCallback(() => {
		const isLogged = !!_token.current;
		observers.forEach((observer) => observer(isLogged));
	}, [observers]);

	const setToken = useCallback(
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

	const getToken = useCallback(() => {
		if (!_token.current) {
			return null;
		}

		if (isExpired(getExpirationDate(_token.current.accessToken))) {
			setToken(null);
		}

		return _token.current && _token.current.accessToken;
	}, [setToken, isExpired, getExpirationDate]);

	const isLoggedIn = useCallback(() => {
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

	const saveToken = useCallback(
		(newToken: LocalStorageTokenType) => {
			tokenProvider.setToken(newToken);
		},
		[tokenProvider]
	);

	const deleteToken = useCallback(() => {
		tokenProvider.setToken(null);
	}, [tokenProvider]);

	const authFetch = useCallback(
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
		const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

		useEffect(() => {
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
