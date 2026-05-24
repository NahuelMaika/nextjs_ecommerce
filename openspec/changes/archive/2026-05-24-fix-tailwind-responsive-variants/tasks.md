## 1. Fix globals.css Tailwind v4 entrypoint

- [x] 1.1 Remove the three `@tailwind base`, `@tailwind components`, and `@tailwind utilities` directive lines from `assets/styles/globals.css`
- [x] 1.2 Add `@import "tailwindcss"` as the first line of `assets/styles/globals.css`, before `@import "tw-animate-css"` and `@import "shadcn/tailwind.css"`
- [x] 1.3 Verify `@custom-variant dark (&:is(.dark *))` remains in the file and is positioned after the imports

## 2. Verify

- [x] 2.1 Run `npm run dev` and confirm no `CssSyntaxError` appears in the terminal
- [x] 2.2 Open the browser and confirm the page loads with correct responsive styles (e.g., `.wrapper` class applies `lg:mx-auto` at large breakpoints)
