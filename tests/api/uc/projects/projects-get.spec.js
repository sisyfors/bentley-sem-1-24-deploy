// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/class/projects
Request: GET
Parameters: N/A
Output: List of Project JSON Objects
*/

/* 
API: api/class/projects
Request: GET
Parameters: title (String)
Output: Project JSON Object
*/

test.describe('Verify Projects API - GET', () => {
    test.fixme('No parameters', async ({ page }) => {
    });

    test.fixme('Empty title parameter', async ({ page }) => {
    });

    test.fixme('Name of non-existing project', async ({ page }) => {
    });

    test.fixme('Name of existing project', async ({ page }) => {
    });
});
