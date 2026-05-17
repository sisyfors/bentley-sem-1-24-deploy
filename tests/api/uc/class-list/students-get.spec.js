// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/class/students
Request: GET
Parameters: N/A
Output: List of Student JSON Objects
*/

/* 
API: api/class/students
Request: GET
Parameters: id (String)
Output: Student JSON Object
*/

test.describe('Verify Class-List API - GET', () => {
    test.fixme('No parameters', async ({ page }) => {
    });

    test.fixme('Empty id parameter', async ({ page }) => {
    });

    test.fixme('ID of non-existing student', async ({ page }) => {
    });

    test.fixme('ID of existing student', async ({ page }) => {
    });
});
