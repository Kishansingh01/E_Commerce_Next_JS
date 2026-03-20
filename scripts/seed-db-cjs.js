const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Use current dir for .env (since script is running in project folder)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
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
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected!');

    const adminEmail = 'admin@bharat.com';
    const existing = await User.findOne({ email: adminEmail });

    if (!existing) {
      console.log('🌱 Creating initial admin user...');
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        phone: '+919999999999',
        passwordHash: 'dummy_hash',
      });
      console.log('🎉 Admin user created! The "users" collection is now ready.');
    } else {
      console.log('ℹ️ Admin user already exists. Collection is already present.');
    }

  } catch (err) {
    console.error('❌ Error during seeding:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected.');
  }
}

seed();
