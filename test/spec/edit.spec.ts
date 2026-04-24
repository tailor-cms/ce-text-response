import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Edit } from '../pom';

const ELEMENT_ID = 'test-text-response-edit';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID, { isGradable: true });
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Initial render', () => {
  test('Renders the correct-answer textarea', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.answerTextarea).toBeVisible();
  });
});

test.describe('Saving', () => {
  test('Persists correct answer across reload', async ({ page }) => {
    const edit = new Edit(page);
    await edit.answerTextarea.fill('The expected answer');
    await edit.form.saveBtn.click();
    await page.reload({ waitUntil: 'networkidle' });
    await expect(edit.answerTextarea).toHaveValue('The expected answer');
  });
});

test.describe('Non-gradable mode', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      isGradable: false,
      embeds: {},
      question: [],
      hint: '',
      feedback: {},
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Hides correct-answer textarea when non-gradable', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.answerTextarea).not.toBeVisible();
  });
});
