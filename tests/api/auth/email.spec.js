// @ts-check
import { test, expect } from '@playwright/test';

test.use({baseURL: 'http://localhost:3000/auth'})

/* 
API: /auth/email
Request: POST
Parameters: 
- newEmail (String)
- username (String)
- type (String)
 */

test.describe('Verify Setting Personal Email API', () => {
    test.fixme('Invalid parameters - should return error code', async ({ request }) => {
    });

    test('Account doesn\'t exist - should return error code', async ({ request }) => {
        const credentials = { newEmail: 'personal@gmail.com', username: 'nonentity@curtin.edu.au', type: 'staff' };
        const apiCall = await request.post('/email', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Username not found');
    });

    test('Valid parameters - should return success code and updated account', async ({ request }) => {
        const credentials = { newEmail: 'personal@gmail.com', username: 'existing.person@curtin.edu.au', type: 'staff' };
        const apiCall = await request.post('/email', {data: credentials});
        expect(apiCall.status()).toEqual(200);

        const account = await apiCall.json();
        expect(account.email).toEqual('personal@gmail.com');
    });
});
