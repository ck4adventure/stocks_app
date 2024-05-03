// seed creates two users in the db, user1 and user2

export const seedTables = async (pool) => {
	try {
		await pool.query(`
			INSERT INTO users (name)
			VALUES ('user1')
		`);
		await pool.query(`
			INSERT INTO users (name)
			VALUES ('user2')
		`);
		console.log('Tables seeded successfully');
	} catch (error) {
		console.error(error);
	}
}