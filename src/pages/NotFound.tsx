import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
	return (
		<>
			<h1>Page not found!</h1>
			<Link to="/" className="btn" title="Go back">
				Go back
			</Link>
		</>
	);
};

export default NotFound;
