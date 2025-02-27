import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './app/data/db/Schema.ts',
  out: './drizzle',

});
