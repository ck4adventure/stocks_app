// test/hooks.ts
import pg from 'pg'
const { Pool } = pg

import { dropTables } from "../scripts/utils/drop.js";
import { migrateTables } from "../scripts/utils/migrate.js";

// note testPool has a maxClient of 1 and a timeout of 1 sec
export const testPool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
	database: "stocks_app_test",
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
	max: 1
});




export const mochaHooks = {
  beforeAll: async  function () {
    // global setup for all tests
		await dropTables(testPool);
		await migrateTables(testPool);
		console.log("finished beforeAll")

  },
  afterAll: async function () {
    // one-time final cleanup
		await dropTables(testPool);
		await testPool.end();

  }
};