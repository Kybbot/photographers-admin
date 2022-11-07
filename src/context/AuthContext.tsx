import React, { createContext, FC, ReactNode, useContext } from "react";

import { useCreateAuthProvider } from "../services/jwt";
import { LocalStorageTokenType } from "../@types/jwt";

export type AuthContextType = {
	authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	saveToken: (newToken: LocalStorageTokenType) => void;
	deleteToken: () => void;
	isLoggedIn: boolean;
};

type AuthProviderType = {
	children: ReactNode;
};

const AuthContext = createContext<Partial<AuthContextType>>({});

export const useAuthContext = () => {
	return useContext(AuthContext) as AuthContextType;
};

export const AuthProvider: FC<AuthProviderType> = ({ children }) => {
	const { authFetch, saveToken, deleteToken, useAuth } = useCreateAuthProvider();

	const isLoggedIn = useAuth();

	const contextValue = {
		authFetch,
		saveToken,
		deleteToken,
		isLoggedIn,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
