import type { AiConfig, ElementMocks } from '@tailor-cms/cek-common';
import { v4 as uuid } from 'uuid';

import type {
  DataInitializer,
  ElementData,
  ElementManifest,
} from './interfaces';

// Element unique id within the target system (e.g. Tailor)
export const type = 'TEXT_RESPONSE';

// Display name (e.g. shown to the author)
export const name = 'Text Response';

// Function which inits element state (data property on the Content Element
// entity)
export const initState: DataInitializer = (config): ElementData => {
  const isGradable = config?.isGradable ?? true;
  return {
    isGradable,
    embeds: {},
    question: [],
    hint: '',
    ...(isGradable && { correct: '' }),
  };
};

// Can be loaded from package.json
export const version = '1.0';

export const isEmpty = (data: ElementData): boolean => !data.question?.length;

export const mocks: ElementMocks = {
  displayContexts: [
    { name: 'No answer', data: {} },
    {
      name: 'Correct answer',
      data: { response: '', isCorrect: true, isSubmitted: true },
    },
    {
      name: 'Wrong answer',
      data: { response: '', isCorrect: false, isSubmitted: true },
    },
  ],
};

// UI configuration for Tailor CMS
const ui = {
  // Display icon, https://pictogrammers.com/library/mdi/
  icon: 'mdi-text-box-edit',
  // Does element support only full width or can be used within layouts
  // (e.g. 50/50 layout)
  forceFullWidth: true,
};

export const ai: AiConfig = {
  Schema: {
    type: 'json_schema',
    name: 'ce_text_response',
    schema: {
      type: 'object',
      properties: {
        question: { type: 'string' },
        correct: { type: 'string' },
        hint: { type: 'string' },
      },
      required: ['question', 'correct', 'hint'],
      additionalProperties: false,
    },
  },
  getPrompt: () => `
    Generate a text response question as an object with the following
    properties:
    {
      "question": "",
      "correct": "",
      "hint": "",
    }
    where:
      - 'question' is the question prompt.
      - 'correct' is the correct answer to the question.
      - 'hint' is an optional hint for the correct solution
  `,
  processResponse: (val: any) => {
    const questionId = uuid();
    const question = {
      id: questionId,
      data: { content: val.question },
      embedded: true,
      position: 1,
      type: 'TIPTAP_HTML',
    };
    return {
      isGradable: true,
      hint: val.hint || '',
      correct: val.correct || '',
      question: [questionId],
      embeds: { [questionId]: question },
    };
  },
};

const manifest: ElementManifest = {
  type,
  version,
  name,
  ssr: false,
  isQuestion: true,
  isComposite: true,
  showFeedback: false,
  initState,
  isEmpty,
  ui,
  ai,
  mocks,
};

export default manifest;
export * from './interfaces';
