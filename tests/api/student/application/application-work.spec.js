// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/student/apply
Request: POST
Parameters:
- projectTitle (String)
- type='work' (String)
- preferencesFor (String[])
- preferencesAgainst (String[])
- resume (FormData)
- coverLetter (FormData)
*/

test.describe('Verify Application API - Work', () => {
    test.fixme('Empty parameters', async ({ page }) => {
    });
    
    test.fixme('Invalid file(s)', async ({ page }) => {
    });

    test.fixme('Missing resume', async ({ page }) => {
    });
    
    test.fixme('Invalid student preferences', async ({ page }) => {
    });

    test.fixme('Contradicting student preferences', async ({ page }) => {
    });

    test.fixme('Valid application', async ({ page }) => {
    });
});
