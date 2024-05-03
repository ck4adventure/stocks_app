import { query } from '../db/index.js';

const randomPrice = () => (Math.random() * 1000).toFixed(2);
const getUserStocksWithFakePrices = async (userID) => {
	const result = await query('SELECT * FROM user_stocks WHERE user_id = $1', [userID]);
	return result.rows.map((stock) => ({ name: stock.initials, price: randomPrice(), id: stock.id }));
}

export const getStocks = async (req, res) => {
	try {
		const userID = req.query.user;
		if (!userID) {
			res.status(400).send('User ID is required');
			return;
		}
		const stocks = await getUserStocksWithFakePrices(userID);
		return res.json(stocks);
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while getting stocks');
	}
};

export const addStocks = async (req, res) => {
	try {
		const { user, name } = req.query;

		if (!user || !name) {
			res.status(400).send('User ID and stock name are required');
			return;
		}
		await query('INSERT INTO user_stocks (user_id, initials) VALUES ($1, $2)', [user, name]);

		const stocks = await getUserStocksWithFakePrices(user);
		return res.json(stocks);
		} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while adding stocks');
	}
};