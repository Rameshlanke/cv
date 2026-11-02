# Django Middleware — motion graphics explainer

A 48-second, 1920×1080 @ 30fps motion graphics video built with [Remotion](https://remotion.dev).

**Rendered video:** [`django-middleware.mp4`](./django-middleware.mp4)

## Scenes

| # | Scene | What it shows |
|---|-------|---------------|
| 1 | Hook | "Your Django view is NOT the first code to run" — 7 default middlewares count up |
| 2 | Flow | A request passes through every layer to the view; the response returns in reverse |
| 3 | Block | A custom middleware returns `403` early — the view never runs |
| 4 | Code | Anatomy of a function middleware: setup / before view / `get_response` / after view |
| 5 | Order | Swapping `SessionMiddleware` and `AuthenticationMiddleware` → `ImproperlyConfigured` |
| 6 | Hooks | `process_view`, `process_exception`, `process_template_response` |
| 7 | Outro | "Write it once. Run it on every request." |

## Commands

```bash
npm i
npx remotion studio            # preview & edit
npx remotion render DjangoMiddleware out/django-middleware.mp4
```

Fonts (Space Grotesk, JetBrains Mono — SIL OFL) are bundled in `public/fonts` so rendering works offline.
