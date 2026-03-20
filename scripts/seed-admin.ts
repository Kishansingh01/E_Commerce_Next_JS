import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  process.exit(1);
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    phone: { type: String, unique: true, sparse: true, trim: true },
    passwordHash: { type: String },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI!);
    
    const adminEmail = 'admin@bharatintudyog.com';

    console.log('🧹 Cleaning existing admin...');
    await User.deleteMany({ email: adminEmail });

    console.log(`🌱 Creating verified admin user: ${adminEmail}...`);
    await User.create({
      name: 'Admin Bharat',
      email: adminEmail,
      phone: '+919999999999',
      passwordHash: hashPassword('admin123'),
      isAdmin: true,
    });
    
    console.log('🎉 Admin verified with "isAdmin: true"! You can now watch this status in Atlas or /api/auth/debug');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
