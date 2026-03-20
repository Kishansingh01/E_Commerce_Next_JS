import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { UserModel } from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await UserModel.find({});
    
    return NextResponse.json({
      status: 'ok',
      db: 'MongoDB Atlas',
      totalUsers: users.length,
      users: users.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        hasPassword: !!u.passwordHash,
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
