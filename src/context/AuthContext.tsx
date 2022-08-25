import React from "react";

import { useCreateAuthProvider } from "../services/jwt";
import { LocalStorageTokenType } from "../@types/jwt";

export type AuthContextType = {
	authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	saveToken: (newToken: LocalStorageTokenType) => void;
	deleteToken: () => void;
	isLoggedIn: boolean;
};

type AuthProviderType = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<Partial<AuthContextType>>({});

export const useAuthContext = () => {
	return React.useContext(AuthContext) as AuthContextType;
};

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
	const { authFetch, saveToken, deleteToken, useAuth } = useCreateAuthProvider();

	const isLoggedIn = useAuth();

	const contextValue = {
		authFetch,
		saveToken,
		deleteToken,
		isLoggedIn,
	};

	console.log("Context");

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
