// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/class/students
Request: POST
Parameters: 
- classList (FormData)
*/

test.describe('Verify Class-List API - POST (File)', () => {
    test.fixme('Null file', async ({ page }) => {
    });

    test.fixme('Missing student details', async ({ page }) => {
    });

    test.fixme('Invalid file format', async ({ page }) => {
    });

    test.fixme('Valid class-list file', async ({ page }) => {
    });
});

/* 
API: api/class/students
Request: POST
Parameters: 
- id (String)
- name (String)
- email (String)
- unit (String)
*/

test.describe('Verify Class-List API - POST (Manual)', () => {
    test.fixme('Empty parameters', async ({ page }) => {
    });

    test.fixme('Invalid email', async ({ page }) => {
    });

    test.fixme('Duplicate student', async ({ page }) => {
    });

    test.fixme('Valid student details', async ({ page }) => {
    });
});