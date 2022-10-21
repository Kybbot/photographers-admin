import React, { ChangeEvent, FormEvent } from "react";

import { useAuthContext } from "../context/AuthContext";
import { InfoMessage } from "../components";
import { loginResponse } from "../@types/api";

const Login: React.FC = () => {
	const { saveToken } = useAuthContext();

	const [formState, setFormState] = React.useState({
		login: "",
		password: "",
	});
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setError(null);

		const { name, value } = event.target;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(null);
		setLoading(true);

		try {
			const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(formState),
			});

			const data = (await response.json()) as loginResponse;

			if (!response.ok && !data.logged) {
				throw new Error(data.message);
			}

			if (response.ok && data.logged) {
				saveToken({ accessToken: data.token.accessToken });
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				setError(error.message);
			}
		}
	};

	return (
		<section className="login" aria-labelledby="loginSectionTitle">
			<div className="login__container">
				<h1 className="login__title" id="loginSectionTitle">
					Log in
				</h1>
				<p className="login__text">Enter your credentials to acces yout account.</p>
				<form className="form login__form" onSubmit={handleFormSubmit}>
					<label className="form__label" htmlFor="login">
						Login
						<input
							onChange={handleInputChange}
							value={formState.login}
							className="form__input"
							type="text"
							id="login"
							name="login"
							autoComplete="username"
						/>
					</label>
					<label className="form__label" htmlFor="password">
						Password
						<input
							onChange={handleInputChange}
							value={formState.password}
							className="form__input"
							type="password"
							id="password"
							name="password"
							autoComplete="new-password"
						/>
					</label>
					<button type="submit" className="btn">
						Login
					</button>
				</form>
				{loading ? <InfoMessage type="loading" message="Loading" /> : null}
				{error ? <InfoMessage type="error" message={error} /> : null}
			</div>
		</section>
	);
};

export default Login;
