import { testPool } from "./hooks.js";
import { expect } from "chai";

describe('Users', function () {
	afterEach(async () => {
		await testPool.query('DELETE FROM users');
	});
	describe('columns', function () {
		it('has an id column which is the primary key', async () => {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'users'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('id');
		});
		it('should have a name', async function () {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'users'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('name');
		});
		it('should have timestamps', async function () {
			const result = await testPool.query(`
				SELECT column_name
				FROM information_schema.columns
				WHERE table_name = 'users'
			`);
			const columnNames = result.rows.map((row) => row.column_name);
			expect(columnNames).to.include('created_at');
			expect(columnNames).to.include('updated_at');
		})
	});
	describe('constraints', function () {
		it('name cannot be an empty string', async function () {
			let error;
			try {
				await testPool.query(`
					INSERT INTO users (name) VALUES ('')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
		it('name must be unique', async function () {
			let error;
			try {
				await testPool.query(`
					INSERT INTO users (name) VALUES ('John')
				`);
				await testPool.query(`
					INSERT INTO users (name) VALUES ('John')
				`);
			} catch (e) {
				error = e;
			}
			expect(error).to.exist;
		});
	});
	describe('final object', function () {
		it('should have an id, name, created_at, and updated_at', async function () {
			const result = await testPool.query(`
				INSERT INTO users (name) VALUES ('Jane')
				RETURNING *
			`);
			const user = result.rows[0];
			expect(user).to.have.property('id');
			expect(user).to.have.property('name');
			expect(user.name).to.equal('Jane');
			expect(user).to.have.property('created_at');
			expect(user.created_at).to.be.a('date');
			expect(user).to.have.property('updated_at');
		});
	});
});