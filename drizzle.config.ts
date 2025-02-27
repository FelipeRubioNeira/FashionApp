import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './app/data/db/Schema.ts',
  out: './drizzle',
  driver: 'expo',
});
