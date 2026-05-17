// @ts-check
import { test, expect } from '@playwright/test';

/* 
API: api/class/groups
Request: POST
Parameters: 
- type='automatic' (String)
Output:
- Group JSON Object
*/

test.describe('Verify Group-Allocation API - POST (Automatic)', () => {
    test.fixme('Empty type parameter', async ({ page }) => {
    });
    
    test.fixme('Type paramater = automatic', async ({ page }) => {
    });
});

/* 
API: api/class/groups
Request: POST
Parameters: 
- type='manual' (String)
- students (String[])
*/

test.describe('Verify Group-Allocation API - POST (Manual)', () => {
    test.fixme('Empty parameter(s)', async ({ page }) => {
    });
    
    test.fixme('Student array of incorrect size', async ({ page }) => {
    });

    test.fixme('Students of mismatched majors', async ({ page }) => {
    });

    test.fixme('Student already allocated', async ({ page }) => {
    });

    test.fixme('Valid group', async ({ page }) => {
    });
});