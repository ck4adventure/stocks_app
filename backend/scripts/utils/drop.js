// dropTables takes a pool (or client) and drops all tables in the database

export const dropTables = async (pool) => {
	try {
		await pool.query(`
		  DROP TABLE IF EXISTS user_stocks;
		`);
		await pool.query(`
		  DROP TABLE IF EXISTS users;
		`);

		console.log('db tables dropped');
	} catch (error) {
		console.error('Error dropping tables', error);
	}
}