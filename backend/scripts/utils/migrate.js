// migrate runs all the migration files in sequential order

import fs from 'fs';
import path from 'path';

export const migrateTables = async (pool) => {
	try {
		const filepath = path.join(process.cwd(), `backend`, 'db', 'migrations');
		console.log(filepath);
		const files = fs.readdirSync(filepath);
		const sortedFiles = files.sort((a, b) => a.split('_')[0] - b.split('_')[0]);
		// read and run each file		
		for (const file of sortedFiles) {
			const sql = fs.readFileSync(filepath + '/' + file).toString();
			await pool.query(sql);
			console.log(`Migrated ${file}`);
		}
		console.log('Tables migrated successfully');
	} catch (error) {
		console.error(error);
	}
}