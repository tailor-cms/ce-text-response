# Text Response

Free-text response question element. The author writes a question prompt and optionally a correct answer; the learner submits a text response.

**Type:** `TEXT_RESPONSE`

## Data

| Field | Type | Description |
|-------|------|-------------|
| `question` | `string[]` | Embedded TipTap question IDs |
| `embeds` | `Record<string, any>` | Embedded element map |
| `correct` | `string?` | Expected answer (only when gradable) |
| `hint` | `string` | Optional hint |
| `isGradable` | `boolean?` | Whether the element is graded |

## Edit

- Rich-text question editor (embedded TipTap)
- Answer textarea shown only when `isGradable`
- Hint editor in side toolbar

## Display

- Renders the question prompt
- Textarea for the learner answer
- Submits response via `submit` (exposed)

## Development

```sh
pnpm dev     # Preview :8080 | Edit :8010 | Display :8020 | Server :8030
pnpm build
pnpm lint
pnpm test
```

## Run with Docker

```sh
docker compose up
```
