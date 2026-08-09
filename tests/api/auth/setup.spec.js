// @ts-check
import { test, expect } from '@playwright/test';

test.use({baseURL: 'http://localhost:3000/auth'})

/* 
API: /auth/setup
Request: POST
Parameters:
- email (String)
- type (String)
 */

test.describe('Verify Setup Account API', () => {
    test.fixme('Invalid parameters - should return error code', async ({ request }) => {
    });

    test('Account already exists - should return error code', async ({ request }) => {
        const credentials = { email: 'existing.person@student.curtin.edu.au', type: 'student' };
        const apiCall = await request.post('/setup', {data: credentials});
        expect(apiCall.status()).toEqual(403);
        expect(apiCall.statusText()).toEqual('Account already exists');
    });

    test('Non-Curtin email address - should return error code', async ({ request }) => {
        const credentials = { email: 'intruder@uwa.edu.au', type: 'student' };
        const apiCall = await request.post('/setup', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Non-Curtin email address');
    });

    test('Staff doesn\'t have staff email - should return error code', async ({ request }) => {
        const credentials = { email: 'pleb@student.curtin.edu.au', type: 'staff' };
        const apiCall = await request.post('/setup', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Staff must have staff email address');
    });

    test('Valid details - should return success code and created account', async ({ request }) => {
        const credentials = { email: 'test.student@student.curtin.edu.au', type: 'student' };
        const apiCall = await request.post('/setup', {data: credentials});
        expect(apiCall.status()).toEqual(201);

        const account = await apiCall.json();
        expect(account.username).toEqual('test.student@student.curtin.edu.au');
    });
});
