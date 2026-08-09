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
        // Check this in api (make separate function and call it)        
    });

    test('Account doesn\'t exist - should return error code', async ({ request }) => {
        const credentials = { username: 'nonentity@gmail.com', password: '123', type: 'staff' };
        const apiCall = await request.post('/login', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Username not found');
    });

    test('Invalid credentials - should return error code', async ({ request }) => {
        // Implement database locally

        const credentials = { username: 'person@student.curtin.edu.au', password: '123', type: 'student' };
        const apiCall = await request.post('/login', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Incorrect password');
    });

    test('Valid credentials - should return success code', async ({ request }) => {
        // Implement database locally

        const credentials = { username: 'person@student.curtin.edu.au', password: 's3cureP@assword', type: 'student' };
        const apiCall = await request.post('/login', {data: credentials});
        expect(apiCall.status()).toEqual(200);
    });

    test.fail('Valid credentials - should return user session', async ({ request }) => {
    });
});
