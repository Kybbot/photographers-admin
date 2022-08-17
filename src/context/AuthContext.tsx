import React from "react";

import { LocalStorageTokenType } from "../@types/jwt";
import { createAuthProvider } from "../services/jwt";

export type AuthContextType = {
	authFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	saveToken: (newToken: LocalStorageTokenType) => void;
	deleteToken: () => void;
	isLoggedIn: boolean;
};

type AuthProviderType = {
	children: React.ReactNode;
};

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
	return React.useContext(AuthContext) as AuthContextType;
};

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
	const { useAuth, authFetch, saveToken, deleteToken } = createAuthProvider();

	const isLoggedIn = useAuth();

	const contextValue = {
		authFetch,
		saveToken,
		deleteToken,
		isLoggedIn,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
