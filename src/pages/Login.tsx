import React from "react";

const Login = () => {
	return (
		<main className="main">
			<div className="container h-100">
				<section className="login" aria-labelledby="loginSectionTitle">
					<div className="login__container">
						<h1 className="login__title" id="loginSectionTitle">
							Log in
						</h1>
						<p className="login__text">Enter your credentials to acces yout account.</p>
						<form className="form login__form">
							<label className="form__label" htmlFor="login">
								Login
								<input className="form__input" type="text" id="login" name="login" autoComplete="username" />
							</label>
							<label className="form__label" htmlFor="password">
								Password
								<input
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
			</div>
		</main>
	);
};

export default Login;
