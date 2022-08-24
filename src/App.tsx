import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Album from "./pages/Album/Album";
import Albums from "./pages/Albums/Albums";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
	const { isLoggedIn } = useAuthContext();

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
