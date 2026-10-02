# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Supabase

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project's API settings. The client is available through `getSupabaseClient` in `src/lib/supabase.js`.

Run `supabase/setup.sql` in the Supabase SQL Editor once to create `public.customers` and seed the sample rows. The Users page loads this table and saves new invitations to it.

The setup script grants anonymous read access and limited invitation inserts for this demo. That makes customer names and emails publicly readable; replace these policies with authenticated, owner-scoped policies before production use. Only use the project's publishable/anon key in this browser app. Never put the database password, service-role key, or other secret keys in a `VITE_` variable; Vite bundles those values into publicly accessible client code.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
