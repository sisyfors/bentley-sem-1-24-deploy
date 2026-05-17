// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/student/apply
Request: POST
Parameters:
- projectTitle (String)
- type='capstone' (String)
- preferencesFor (String[])
- preferencesAgainst (String[])
- cwa (Float)
*/

test.describe('Verify Application API - Capstone', () => {
    test.fixme('Empty parameters', async ({ page }) => {
    });

    test.fixme('Invalid CWA', async ({ page }) => {
    });
    
    test.fixme('Invalid student preferences', async ({ page }) => {
    });

    test.fixme('Contradicting student preferences', async ({ page }) => {
    });

    test.fixme('Valid application', async ({ page }) => {
    });
});
