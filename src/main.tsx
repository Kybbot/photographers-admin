import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";
import { ScrollToTop } from "./components";

import store from "./redux/store";

import "./assets/css/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<>
		<Provider store={store}>
			<BrowserRouter>
				<AuthProvider>
					<ScrollToTop />
					<App />
				</AuthProvider>
			</BrowserRouter>
		</Provider>
	</>
);
