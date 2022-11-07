import React, { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuthContext } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Album from "./pages/Album";
import Albums from "./pages/Albums";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import { useAuthFetch } from "./hooks/useAuthFetch";
import { useAlbums } from "./stores/useAlbums";

import { ClientsType } from "./@types/api";

const App: FC = () => {
	const { isLoggedIn } = useAuthContext();
	const { request } = useAuthFetch();

	const [clientsNumbers, setAllClients] = useAlbums((state) => [state.clientsNumbers, state.setAllClients]);

	useEffect(() => {
		const getClients = async () => {
			const result = await request<ClientsType[]>("/clients", "GET");

			if (result?.success) {
				setAllClients(result.data);
			}
		};

		if (isLoggedIn && !clientsNumbers.length) {
			void getClients();
		}
	}, [isLoggedIn, request, clientsNumbers, setAllClients]);

	useEffect(() => {
		function handleResize() {
			const vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	if (isLoggedIn) {
		return (
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Albums />} />
					<Route path="album/:id" element={<Album />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		);
	} else {
		return (
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Login />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		);
	}
};

export default App;
