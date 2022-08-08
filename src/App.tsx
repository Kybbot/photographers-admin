import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Album from "./pages/Album";
import Albums from "./pages/Albums";
import Login from "./pages/Login";

const App: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="/" element={<Albums />} />
				<Route path="/album/:id" element={<Album />} />
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	);
};

export default App;
