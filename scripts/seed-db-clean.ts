import mongoose from 'mongoose';
import path from 'path';
import crypto from 'crypto';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found');
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
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    
    const adminEmail = 'admin@bharatintudyog.com';
    const oldEmail = 'admin@bharat.com';

    console.log('🧹 Cleaning up old seed data...');
    await User.deleteMany({ email: { $in: [adminEmail, oldEmail] } });
    await User.deleteMany({ phone: '+919999999999' });

    console.log(`🌱 Creating fresh admin user: ${adminEmail}...`);
    await User.create({
      name: 'Admin Bharat',
      email: adminEmail,
      phone: '+919999999999',
      passwordHash: hashPassword('admin123'),
    });
    
    console.log('🎉 Seeded successfully! Login with admin@bharatintudyog.com / admin123');
  } catch (err) {
    console.error('❌ Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected.');
  }
}

seed();
