import request from "supertest";
import app from '../../src/app';

test('GET all user has status code = 200', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
})