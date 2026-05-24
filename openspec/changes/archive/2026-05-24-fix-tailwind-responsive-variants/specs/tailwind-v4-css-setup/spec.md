## ADDED Requirements

### Requirement: Tailwind v4 CSS entrypoint
`assets/styles/globals.css` SHALL use `@import "tailwindcss"` as its primary Tailwind entrypoint instead of the v3 `@tailwind base/components/utilities` directives, so that all default responsive breakpoint variants are registered.

#### Scenario: Dev server starts without CSS errors
- **WHEN** the developer runs `npm run dev`
- **THEN** the Next.js dev server starts successfully with no `CssSyntaxError` about missing variants

#### Scenario: Responsive variants resolve in @apply
- **WHEN** a `@layer utilities` block uses `@apply lg:mx-auto` or any other responsive variant
- **THEN** Tailwind resolves the utility without throwing "variant does not exist"

#### Scenario: Custom dark variant is preserved
- **WHEN** a component uses the `dark:` variant class
- **THEN** the custom `@custom-variant dark (&:is(.dark *))` rule applies (class-based dark mode, not media-query-based)

#### Scenario: Animation and shadcn theme imports remain active
- **WHEN** the CSS is compiled
- **THEN** `tw-animate-css` and `shadcn/tailwind.css` styles are still present in the output
