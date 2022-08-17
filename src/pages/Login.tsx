import React, { ChangeEvent, FormEvent } from "react";

import { useAuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
	const { saveToken } = useAuthContext();

	const [formState, setFormState] = React.useState({
		login: "",
		password: "",
	});

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// saveToken({ accessToken: "token" });

		const response = await fetch("https://splastun2.node.shpp.me/api/login", {
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(formState),
		});

		console.log(response);

		type dataType = {
			token: string;
			user: {
				person_id: number;
				login: string;
				fullname: string;
				email: string;
			};
		};

		const data = (await response.json()) as dataType;

		console.log(data);
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
			</div>
		</section>
	);
};

export default Login;
