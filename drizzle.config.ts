import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './app/db/Schema.tsx',
  out: './drizzle',

});
