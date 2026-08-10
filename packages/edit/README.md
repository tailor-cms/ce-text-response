# @tailor-cms/ce-text-response-edit

Authoring component for the **Text Response** content element in [Tailor CMS](https://github.com/tailor-cms/author).

Renders the element inside the Tailor authoring interface, where content is created and edited.

## Installation

```sh
npm install @tailor-cms/ce-text-response-edit
```

## Usage

Content elements are normally registered with Tailor through the element
registry rather than imported directly, but the package can be consumed on its
own:

```ts
import { Edit } from '@tailor-cms/ce-text-response-edit';
```

## Element

| Property | Value |
| --- | --- |
| Name | Text Response |
| Type | `TEXT_RESPONSE` |
| Icon | [`mdi-text-box-edit`](https://pictogrammers.com/library/mdi/) |
| Composite | Yes |
| Question | Yes |

## Packages

This element ships as four packages, published together from the
[`ce-text-response`](https://github.com/tailor-cms/ce-text-response) repository:

| Package | Role |
| --- | --- |
| [`@tailor-cms/ce-text-response-manifest`](https://www.npmjs.com/package/@tailor-cms/ce-text-response-manifest) | Shared element definition |
| [`@tailor-cms/ce-text-response-edit`](https://www.npmjs.com/package/@tailor-cms/ce-text-response-edit) | Authoring component |
| [`@tailor-cms/ce-text-response-display`](https://www.npmjs.com/package/@tailor-cms/ce-text-response-display) | End-user component |
| [`@tailor-cms/ce-text-response-server`](https://www.npmjs.com/package/@tailor-cms/ce-text-response-server) | Server-side module |

## Development

```sh
pnpm install
pnpm dev     # start the Content Element Kit runtime
pnpm build   # build all packages
pnpm test    # Playwright end-to-end suite
```

Changes are released with [changesets](https://github.com/changesets/changesets);
run `pnpm changeset` to record one.
