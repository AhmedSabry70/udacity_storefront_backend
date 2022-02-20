import supertest from 'supertest';
import app from '../index';

// create request object
const request = supertest(app);

describe('Testing endpoint', () => {
	it('gets the api endpoint *** HOME PAGE**  return status code 200 status', async () => {
		const result = await request.get('/');

		expect(result.status).toBe(200);
	});

	it('it should return status code 404 status. *** NOT EXISTE ROUTE/ENDPOINT', async () => {
		const result = await request.get('/resize?name=fjor&w=200&h=200');

		expect(result.status).not.toBe(200);
	});
});
