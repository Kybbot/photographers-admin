import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ScrollToTop } from "./components";
import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ScrollToTop />
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
