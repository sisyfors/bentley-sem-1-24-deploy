// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/class/students
Request: PATCH
Parameters: 
- id (String)
- resume (FormData)
- coverLetter (FormData)
- group (Integer)
*/

test.describe('Verify Class-List API - PATCH', () => {
    test.fixme('Empty id parameter', async ({ page }) => {
    });

    test.fixme('ID of non-existing student', async ({ page }) => {
    });

    test.fixme('Invalid group number', async ({ page }) => {
    });

    test.fixme('Valid student details', async ({ page }) => {
    });
});