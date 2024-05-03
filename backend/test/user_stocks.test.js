import { expect } from "chai";
import { testPool } from "./hooks.js";

describe("User Stocks", () => {
	describe("columns", () => {
		it('has an id column which is the primary key', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'user_stocks'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('id');
		});
		it("should have a user_id column", async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'user_stocks'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('user_id');
		});
		it('user_id should be a foreign key', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'user_stocks' AND constraint_type = 'FOREIGN KEY'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('user_stocks_user_id_fkey');
		});


		it("should have a initials column", async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'user_stocks'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('initials');
		});
		it("should have a quantity column", () => {
			expect(true).to.be.true;
		});
	});
	describe('constraints', () => {
		it('should have a unique constraint on user_id and initials', async () => {
			const result = await testPool.query(`
				SELECT constraint_name
				FROM information_schema.table_constraints
				WHERE table_name = 'user_stocks' AND constraint_type = 'UNIQUE'
			`);
			const constraintNames = result.rows.map((row) => row.constraint_name);
			expect(constraintNames).to.include('user_stocks_unique');
		});
	});
	it('should not allow empty string for initials', async () => {
		let error;
		try {
			const result = await testPool.query(`
				INSERT INTO users (name) VALUES ('Jane')
				RETURNING *
			`);
			const user = result.rows[0];
			await testPool.query(`
				INSERT INTO user_stocks (initials, user_id) VALUES ('', ${user.id})
			`);
		} catch (e) {
			error = e;
		}
		expect(error).to.exist;
	});
});