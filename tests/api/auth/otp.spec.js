// @ts-check
import { test, expect } from '@playwright/test';

test.use({baseURL: 'http://localhost:3000/auth'})

/* 
API: /auth/otp
Request: POST
Parameters: 
- username (String)
- otp (String)
- type (String)
 */

test.describe('Verify OTP API', () => {
    test.fail('Invalid parameters - should return error code', async ({ request }) => {
        const badParameters = { username: 'bademail', otp: 'letters', type: 'stafff' };
        const apiCall = await request.post('/otp', {data: badParameters});

        expect(apiCall.status()).toEqual(422);
    });

    test('Account doesn\'t exist - should return error code', async ({ request }) => {
        const credentials = { username: 'nonentity@gmail.com', otp: '49851', type: 'staff' };
        const apiCall = await request.post('/otp', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Username not found');
    });

    test('Incorrect OTP - should return error code', async ({ request }) => {
        const credentials = { username: 'person@student.curtin.edu.au', otp: '123', type: 'student' };
        const apiCall = await request.post('/otp', {data: credentials});
        expect(apiCall.status()).toEqual(401);
        expect(apiCall.statusText()).toEqual('Incorrect OTP');
    });

    test('Correct OTP - should return success code and store session cookie', async ({ request }) => {
        const credentials = { username: 'person@student.curtin.edu.au', otp: '37691', type: 'student' };
        
        const apiCall = await request.post('/otp', {data: credentials});

        expect(apiCall.status()).toEqual(200);

        const cookies = (await request.storageState()).cookies;
        const tokenCookie = cookies.find(c => c.name === 'token');
        expect(tokenCookie).toBeTruthy();
    });
});
