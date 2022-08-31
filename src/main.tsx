import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import { ScrollToTop } from "./components";

import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<BrowserRouter>
			<AuthProvider>
				<ScrollToTop />
				<App />
			</AuthProvider>
		</BrowserRouter>
	</>
);
