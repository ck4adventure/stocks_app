import { pool } from './db.js';

export const query = async (text, params) => {
	try {
	const res = await pool.query(text, params);
	return res
	} catch (error) {
		console.error('error running query', error)
		throw error
	}
}