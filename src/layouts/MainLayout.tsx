import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<main className="main">
			<div className="container h-100">
				<Outlet />
			</div>
		</main>
	);
};

export default MainLayout;
