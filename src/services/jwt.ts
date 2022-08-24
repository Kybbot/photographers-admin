import React from "react";

import { LocalStorageTokenSchema, LocalStorageTokenType, TokenPayloadSchema, observerType } from "../@types/jwt";

const createTokenProvider = () => {
	let _token: LocalStorageTokenType =
		LocalStorageTokenSchema.parse(JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH") || "null")) || null;

	const getExpirationDate = (jwtToken: string): number | null => {
		if (!jwtToken) {
			return null;
		}

		const jwt = TokenPayloadSchema.parse(JSON.parse(atob(jwtToken.split(".")[1])));

		return (jwt && jwt.exp && jwt.exp * 1000) || null;
	};

	const isExpired = (exp: number | null) => {
		if (!exp) {
			return false;
		}

		return Date.now() > exp;
	};

	const getToken = () => {
		if (!_token) {
			return null;
		}

		if (isExpired(getExpirationDate(_token.accessToken))) {
			setToken(null);
		}

		return _token && _token.accessToken;
	};

	const isLoggedIn = () => {
		return !!getToken();
	};

	const observers: Array<observerType> = [];

	const subscribe = (observer: observerType) => {
		observers.push(observer);
	};

	const unsubscribe = (observer: observerType) => {
		observers.filter((item) => item !== observer);
	};

	const notify = () => {
		const isLogged = isLoggedIn();
		observers.forEach((observer) => observer(isLogged));
	};

	const setToken = (token: LocalStorageTokenType) => {
		if (token) {
			localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
		} else {
			localStorage.removeItem("REACT_TOKEN_AUTH");
		}

		_token = token;
		notify();
	};

	return {
		getToken,
		isLoggedIn,
		setToken,
		subscribe,
		unsubscribe,
	};
};

export const createAuthProvider = () => {
	const tokenProvider = createTokenProvider();

	const saveToken = (newToken: LocalStorageTokenType) => {
		tokenProvider.setToken(newToken);
	};

	const deleteToken = () => {
		tokenProvider.setToken(null);
	};

	const authFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
		const token = tokenProvider.getToken();

		init = init || {};

		init.headers = {
			...init.headers,
			Authorization: `Bearer ${String(token)}`,
		};

		return fetch(input, init);
	};

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
