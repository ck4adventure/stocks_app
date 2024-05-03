// LoggedOutPage is full page that has a toggle between signing in as User1 and User2
const users = {
	1: { name: "Stocks Trader",
				id: 1,
	 },
	2: { name: "Stocks Manager",
				id: 2,
	 },
}

export const LoggedOutPage = ({ onChooseUser }) => {
	return (
		<div className="flex flex-col items-center m-8">
			<div>Choose a User for the Demo</div>
			<div>
				{Object.keys(users).map((userId) => (
					<button className="m-2" key={userId} onClick={() => onChooseUser(users[userId])}>
						{users[userId].name}
					</button>
				))}
			</div>
		</div>
	);
}