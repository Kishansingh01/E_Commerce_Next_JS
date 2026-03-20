import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { UserModel } from '@/lib/models/User';
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function GET() {
  try {
    console.log('🔄 Seeding starting...');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const adminEmail = 'admin@bharatintudyog.com';
    
    console.log(`🌱 Checking for admin user: ${adminEmail}`);
    const existing = await UserModel.findOne({ email: adminEmail });

    if (!existing) {
      console.log('🌱 Creating initial admin user...');
      const admin = await UserModel.create({
        name: 'Admin Bharat',
        email: adminEmail,
        phone: '+919999999999',
        passwordHash: hashPassword('admin123'),
      });
      console.log('🎉 Seeded admin user:', admin._id);
      return NextResponse.json({ success: true, message: 'Collection created and admin user seeded!', id: admin._id });
    } else {
      console.log('ℹ️ Admin user already exists. Updating password to "admin123"...');
      await UserModel.updateOne(
        { email: adminEmail },
        { $set: { passwordHash: hashPassword('admin123') } }
      );
      return NextResponse.json({ success: true, message: 'User already exists, password updated.' });
    }

  } catch (error: any) {
    console.error('❌ Seeding Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
