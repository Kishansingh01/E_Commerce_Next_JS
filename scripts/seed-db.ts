import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';

// Note: This script should be run with the `--env-file=.env` flag in Node.js 20.6.0+
// Example: npx tsx --env-file=.env k:\Bharat\E_Commerce_Next_JS\scripts\seed-db.ts

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment');
  process.exit(1);
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, trim: true },
    passwordHash: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('✅ Connected!');

    const adminEmail = 'admin@bharatintudyog.com';
    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      console.log(`🌱 Creating initial admin user: ${adminEmail}...`);
      await User.create({
        name: 'Admin Bharat',
        email: adminEmail,
        phone: '+919999999999',
        passwordHash: hashPassword('admin123'),
      });
      console.log('🎉 Admin user created!');
    } else {
      console.log(`ℹ️ Admin user already exists (${adminEmail}). Updating password...`);
      await User.updateOne(
        { email: adminEmail },
        { $set: { passwordHash: hashPassword('admin123') } }
      );
      console.log('✅ Password updated for admin account.');
    }

  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected.');
  }
}

seed();
