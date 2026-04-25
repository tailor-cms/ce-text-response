import { elementClient, pom } from '@tailor-cms/cek-e2e';
import { expect, test } from '@playwright/test';

import { Display } from '../pom';

const ELEMENT_ID = 'test-text-response-display';

const SEED = {
  isGradable: true,
  correct: 'expected',
  embeds: {
    prompt: {
      id: 'prompt',
      type: 'TIPTAP_HTML',
      position: 1,
      embedded: true,
      data: { content: 'Describe your answer.' },
    },
  },
  question: ['prompt'],
  hint: '',
  feedback: {},
};

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await elementClient.resetState(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Empty state', () => {
  test('Renders placeholder when no correct answer is set', async ({
    page,
  }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
  });
});

test.describe('With correct answer set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, SEED);
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Renders the answer textarea', async ({ page }) => {
    const display = new Display(page);
    await expect(display.answerTextarea).toBeVisible();
    await expect(display.answerTextarea).toHaveValue('');
  });

  test('Typing and submitting locks the textarea', async ({ page }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await expect(display.answerTextarea).not.toHaveAttribute('readonly');
    await display.answerTextarea.fill('my response');
    await form.submit();
    await expect(display.answerTextarea).toHaveAttribute('readonly');
  });

  test('Submitting correct answer marks feedback as success', async ({
    page,
  }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.answerTextarea.fill('expected');
    await form.submit();
    await expect(form.feedback).toHaveClass(/success/);
  });

  test('Submitting wrong answer marks feedback as error', async ({ page }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.answerTextarea.fill('not expected');
    await form.submit();
    await expect(form.feedback).toHaveClass(/error/);
  });
});

test.describe('Non-gradable mode', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, {
      ...SEED,
      isGradable: false,
      correct: undefined,
    });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Feedback is not flagged as success or error', async ({ page }) => {
    const display = new Display(page);
    const form = new pom.DisplayQuestionForm(display.el);
    await display.answerTextarea.fill('any response');
    await form.submit();
    await expect(form.feedback).not.toHaveClass(/success/);
    await expect(form.feedback).not.toHaveClass(/error/);
  });
});
