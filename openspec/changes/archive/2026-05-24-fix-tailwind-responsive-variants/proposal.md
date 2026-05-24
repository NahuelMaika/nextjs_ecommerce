## Why

The project uses Tailwind CSS v4 but `globals.css` still uses v3-style `@tailwind base/components/utilities` directives, which do not register responsive breakpoint variants (like `lg`, `md`, `sm`) in v4. This causes a `CssSyntaxError` when any `@apply` rule references a responsive variant, blocking `npm run dev` entirely.

## What Changes

- Replace the three `@tailwind base/components/utilities` directives in `assets/styles/globals.css` with the single Tailwind v4 entry point: `@import "tailwindcss"`
- Remove the now-redundant `@layer components {}` and `@layer utilities {}` wrappers that duplicated base/component styles already covered by the import

## Capabilities

### New Capabilities

- `tailwind-v4-css-setup`: Correct Tailwind v4 CSS entrypoint that loads all base styles, utilities, and responsive breakpoint variants

### Modified Capabilities

_(none — this is a bug fix with no spec-level behavior changes)_

## Impact

- **File**: `assets/styles/globals.css` — single file change
- **Runtime**: Fixes the dev server crash; `lg:`, `md:`, and all other responsive variants become available in `@apply` rules
- **No API or component changes**: purely a CSS configuration fix
