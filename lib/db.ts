import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/drizzle/schema';


export const db = drizzle({
    schema,
    client: neon(process.env.DATABASE_URL as string),
});