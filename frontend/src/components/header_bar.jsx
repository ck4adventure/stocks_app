import React from "react";

export const HeaderBar = ({ user, handleLogout }) => {

	if (!user) {
		return (
			<div className="m-4 flex justify-end">
				Not logged in.
			</div>
		)
	}
	const { name, id } = user;


	return (
		<div className="flex flex-col items-end">
			<div className="text-blue-700 m-2">Welcome, {name}</div>
			<button className="mx-2" onClick={handleLogout}>Logout</button>
		</div>
	);
}