import pg from 'pg'
const { Pool } = pg
import 'dotenv/config'

import { dropTables } from './utils/drop.js';
import { migrateTables } from './utils/migrate.js';
import { seedTables } from './utils/seed.js';



const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
	database: process.env.PG_DATABASE,
  idleTimeoutMillis: 3000,
  connectionTimeoutMillis: 1000,
});


const setupDB = async () => {
	const client = await pool.connect();
	console.log(`pool connected to ${process.env.PG_DATABASE}`);
	try {
		await dropTables(client);
		await migrateTables(client);
		await seedTables(client);
	} catch (error) {
		console.error(error);
		throw error;
	} finally {
		client.release();
		console.log("pool should be closed now");
	}
}

setupDB();