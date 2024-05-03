import 'dotenv/config'
import pg from 'pg'
const { Pool } = pg


// # local pg setup
// PG_DATABASE="practice"
// PG_HOST="localhost"
// PG_USER="default"
// no password should be needed, depending on your pg setup
 
export const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
	database: process.env.PG_DATABASE,
});

pool.on('connect', () => {
	console.log('connected to the host', process.env.PG_HOST);
	console.log('connected to the db', process.env.PG_DATABASE);
});

