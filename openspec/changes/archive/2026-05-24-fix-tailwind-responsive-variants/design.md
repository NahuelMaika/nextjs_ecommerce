## Context

The project has Tailwind CSS v4 installed (`tailwindcss@^4`, `@tailwindcss/postcss@^4`) with the correct `postcss.config.mjs`. However, `assets/styles/globals.css` was written using Tailwind v3 directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`). In Tailwind v4, these directives are not fully equivalent — they do not register the responsive breakpoint variant system (`sm`, `md`, `lg`, `xl`, `2xl`). The v4 entry point is the single `@import "tailwindcss"` statement, which bootstraps the entire theme, base styles, utilities, *and* responsive variants in one shot.

## Goals / Non-Goals

**Goals:**
- Make `npm run dev` succeed without the `CssSyntaxError` about `lg` variant
- Preserve all existing custom styles (`@layer utilities`, `@theme inline`, `@custom-variant dark`, CSS variable definitions)
- Keep the `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"` imports intact

**Non-Goals:**
- Migrating to a different CSS architecture (CSS Modules, styled-components, etc.)
- Upgrading or downgrading any package versions
- Changing any component or layout files

## Decisions

### Replace `@tailwind` directives with `@import "tailwindcss"`

**Decision**: Remove the three `@tailwind base/components/utilities` lines and replace them with `@import "tailwindcss"` at the top of the file, before the other imports.

**Why**: In Tailwind v4, `@import "tailwindcss"` is the canonical entry point. It loads the default theme (which defines `--breakpoint-lg`, etc.) and generates all variant rules. The old `@tailwind` directives, when processed by `@tailwindcss/postcss` v4, do not trigger the same variant registration, causing any `lg:*` or `md:*` inside `@apply` to fail with "variant does not exist."

**Alternatives considered**:
- *Manually define breakpoints via `@theme`*: Works, but is redundant boilerplate since `@import "tailwindcss"` already includes them. Error-prone to maintain.
- *Downgrade to Tailwind v3*: Would require a different postcss config and conflicts with the shadcn v4-style CSS variables already in the file.

### Import order

**Decision**: Place `@import "tailwindcss"` first, followed by `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"`.

**Why**: The Tailwind v4 PostCSS plugin requires the main import to appear before any `@layer` or `@theme` blocks to establish the correct cascade order. Subsequent imports that extend the theme (like shadcn's `@theme inline` keyframes) must come after.

## Risks / Trade-offs

- **Risk**: `@import "tailwindcss"` injects Tailwind's preflight (CSS reset) which may already be partially applied via the old `@tailwind base`. In practice these are identical, so no visual regression is expected.  
  → **Mitigation**: Visual regression is low-risk for a new project with a single initial commit; verify in browser after fix.

- **Risk**: The `@custom-variant dark (&:is(.dark *))` must remain after the Tailwind import to override Tailwind's built-in `dark` variant.  
  → **Mitigation**: Keep it in place immediately after the imports — no reordering needed.

## Open Questions

_(none — the fix is unambiguous)_
