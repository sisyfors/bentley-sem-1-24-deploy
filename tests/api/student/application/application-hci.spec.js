// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/student/apply
Request: POST
Parameters:
- type='hci' (String)
- preferencesFor (String[])
- preferencesAgainst (String[])
*/

test.describe('Verify Application API - HCI', () => {
    test.fixme('Empty type parameter', async ({ page }) => {
    });

    test.fixme('Missing student preferences', async ({ page }) => {
    });
    
    test.fixme('Invalid student preferences', async ({ page }) => {
    });

    test.fixme('Contradicting student preferences', async ({ page }) => {
    });

    test.fixme('Valid application', async ({ page }) => {
    });
});
