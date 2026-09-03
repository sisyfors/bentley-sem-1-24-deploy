// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: /auth/email
Request: POST
Parameters: 
- newEmail (String)
 */

/**
 * @type {import("playwright-core").APIRequestContext}
 */
let apiContext;

test.describe('Verify Setting Personal Email API', () => {
    test.beforeAll(async ({ playwright }) => {
        apiContext = await playwright.request.newContext({baseURL: 'http://localhost:3000/auth/email'});
    });

    test('Invalid parameters - should return error code', async () => {
        const invalidEmail = { newEmail: 'user@' };
        const apiCall = await apiContext.post('', {data: invalidEmail});
        
        expect(apiCall.status()).toEqual(422);
    });

    test('Not logged in - should return error code', async () => {
        const credentials = { newEmail: 'personal@gmail.com' };
        const apiCall = await apiContext.post('', {data: credentials});

        expect(apiCall.status()).toEqual(401);
        expect(await apiCall.text()).toEqual('Not authorised');
    });

    test('Valid parameters + logged in - should return success code and updated account', async ({ request }) => {       
        const credentials = { username: 'some.guy@student.curtin.edu.au', password: 'DhBU6nfNykHy', type: 'student' };
        await request.post('http://localhost:3000/auth/login', {data: credentials});

        const updatedEmail = { newEmail: 'josiahwb@outlook.com.au' };
        const emailCall = await request.post('http://localhost:3000/auth/email', {data: updatedEmail});
        expect(emailCall.status()).toEqual(200);

        const account = await emailCall.json();
        expect(account.Email).toEqual('josiahwb@outlook.com.au');
    });
});
