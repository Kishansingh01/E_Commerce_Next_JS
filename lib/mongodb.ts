/**
 * lib/mongodb.ts
 * Singleton Mongoose connection helper for Next.js.
 * Reuses the connection across hot-reloads in dev mode via globalThis.
 */
import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI as string;
console.log("MONGODB_URI ",MONGODB_URI )

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

declare global {
  // eslint-disable-next-line no-var
  var __mongooseConn: typeof mongoose | undefined;
  // eslint-disable-next-line no-var
  var __mongoosePromise: Promise<typeof mongoose> | undefined;
}

let cached = globalThis.__mongooseConn;
let cachedPromise = globalThis.__mongoosePromise;

export async function connectDB(): Promise<typeof mongoose> {
  // Already connected
  if (cached && mongoose.connection.readyState === 1) {
    return cached;
  }

  // Connection already in progress
  if (!cachedPromise) {
    console.log('🔄 [MongoDB] Connecting to database...');
    cachedPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((conn) => {
      console.log('✅ [MongoDB] Connected successfully!');
      return conn;
    }).catch((err) => {
      console.error('❌ [MongoDB] Connection failed:', err.message);
      cachedPromise = undefined;
      globalThis.__mongoosePromise = undefined;
      throw err;
    });
    globalThis.__mongoosePromise = cachedPromise;
  }

  cached = await cachedPromise;
  globalThis.__mongooseConn = cached;
  return cached;
}
