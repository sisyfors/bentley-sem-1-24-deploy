// @ts-check
import { test, expect } from '@playwright/test';

test.use({baseURL: 'http://localhost:3000/auth'})

/* 
API: /auth/login
Request: POST
Parameters: 
 - email (String)
 - password (String)
 - type (String)
 */

test.describe('Verify login API', () => {
    test.fail('Invalid parameters - should return error code', async ({ request }) => {
        const badParameters = { username: 'bademail', password: '', type: 'unitcoordinator' };
        const apiCall = await request.post('/login', {data: badParameters});

        expect(apiCall.status()).toEqual(422);
    });

    test('Account doesn\'t exist - should return error code', async ({ request }) => {
        const credentials = { username: 'nonentity@gmail.com', password: '123', type: 'staff' };
        const apiCall = await request.post('/login', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Username not found');
    });

    test('Invalid credentials - should return error code', async ({ request }) => {
        const credentials = { username: 'person@student.curtin.edu.au', password: '123', type: 'student' };
        const apiCall = await request.post('/login', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Incorrect password');
    });

    test('Valid credentials - should return success code and store session cookie', async ({ request }) => {
        const credentials = { username: 'person@student.curtin.edu.au', password: 's3cureP@assword', type: 'student' };
        
        const apiCall = await request.post('/login', {data: credentials});

        expect(apiCall.status()).toEqual(200);

        const cookies = (await request.storageState()).cookies;
        const tokenCookie = cookies.find(c => c.name === 'token');
        expect(tokenCookie).toBeTruthy();

    });
});
